import http from "k6/http";
export const options = {
    duration: '10s',
    vus: 100,
    summaryTrendStats: ["avg","min","med","p(95)","p(99)"]
}

export default ()=> {
 http.post('http://host.docker.internal:7778/',{user:"testUser",exercise:"Sum of three values",code:Math.random().toFixed(4)});
}