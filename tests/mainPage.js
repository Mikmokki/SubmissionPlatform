import http from "k6/http";
export const options = {
    duration: '10s',
    vus: 100,
    summaryTrendStats: ["avg","min","med","p(95)","p(99)"]
}

export default ()=> {
 http.get('http://host.docker.internal:7778/?user=testUser');
}