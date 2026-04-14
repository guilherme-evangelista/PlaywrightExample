const fs = require('fs');

const INFLUX_URL = process.env.INFLUX_URL;
const INFLUX_ORG = process.env.INFLUX_ORG;
const INFLUX_TOKEN = process.env.INFLUX_TOKEN;
const BUCKET = 'test_metrics';

const COMMIT_HASH = process.env.COMMIT_HASH || 'local';
const BRANCH_NAME = process.env.BRANCH_NAME || 'local';

async function sendMetrics() {
  try {
    const resultsPath = './playwright-report/results.json';
    if (!fs.existsSync(resultsPath)) {
        throw new Error(`Arquivo de resultados não encontrado em: ${resultsPath}`);
    }
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

    const passed = results.stats.expected || 0;
    const failed = results.stats.unexpected || 0;
    const flaky = results.stats.flaky || 0;
    const totalTests = passed + failed + flaky;
    const duration = Math.round(results.stats.duration || 0);

    const lineProtocolData = `playwright_tests,branch=${BRANCH_NAME},commit=${COMMIT_HASH} total=${totalTests}i,passed=${passed}i,failed=${failed}i,duration=${duration}i`;

    console.log('Enviando dados para o InfluxDB:', lineProtocolData);

    const response = await fetch(`${INFLUX_URL}/api/v2/write?org=${INFLUX_ORG}&bucket=${BUCKET}&precision=ms`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${INFLUX_TOKEN}`,
        'Content-Type': 'text/plain; charset=utf-8',
        'Accept': 'application/json'
      },
      body: lineProtocolData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }

    console.log('✅ Métricas enviadas com sucesso e prontas para o Grafana!');
  } catch (error) {
    console.error('❌ Erro ao enviar métricas:', error.message);
    process.exit(1); 
  }
}

sendMetrics();