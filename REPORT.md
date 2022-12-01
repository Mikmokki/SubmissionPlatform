# Project 2 report

Write the project report here. Do not include your personal
details (e.g. name or student number).

The project can be run on http://localhost:7778/ with docker running 
First it is needed to run build.sh file on folder grader-image with command sudo docker build -t grader-image .
Second, Go to ui folder and use command npm install
Then it is possible to run docker from the root folder with command: sudo docker-compose up --build

For testing the project
1. Run the program with sudo docker-compose up --build
2. Open second terminal and go to tests folder
2. use the commands below

sudo docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <gradeSubmission.js;
sudo docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <mainPage.js; 
sudo docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <exercisePage.js;



# Core Web Vitals tests with Google Lighthouse
I ran Google Lighthouse on both main page and on exercise page with couple of submissions.
Main Page took more to load and got the following scores.

Performance 99
Accessibility 96
Best Practises 100
SEO 89

First Contentful Paint 0.7 s
Time to Interactive 1.1 s
Speed Index 0.7 s
Total Blocking Time 0 ms
Largest Contentful Paint 0.7 s
Cumulative Layout Shift 0.005

The exercise page got following scores.
Performance 100
Accessibility 80
Best Practises 100
SEO 89

First Contentful Paint 0.4 s
Time to Interactive 0.4 s
Speed Index 0.4 s
Total Blocking Time 0 ms
Largest Contentful Paint 0.5 s
Cumulative Layout Shift 0.03

Both of the pages have great scores overall and that is propably due to the technologies used. There are not a lot javascript animations on the page that would slow the page down.
Also, using Astro with server side rendering, the browser does not have to load that much Javascript. The app is also quite simple with only a bit of looping over components.
For more transparent view of the performance, I included lighthouse results as JSON-files that can find on the root folder.
# K6 performance tests
I tested grade submission, main page and exercise page loads under a load of 10 seconds with 100 concurrent users.

Grade Submission:

     data_received..................: 29 MB  2.8 MB/s
     data_sent......................: 392 kB 37 kB/s
     http_req_blocked...............: avg=3.05ms   min=1.6µs   med=3.4µs    p(95)=51.5ms   p(99)=63.76ms 
     http_req_connecting............: avg=3.04ms   min=0s      med=0s       p(95)=51.45ms  p(99)=63.52ms 
     http_req_duration..............: avg=559.82ms min=52.65ms med=555.58ms p(95)=696.9ms  p(99)=1.08s   
       { expected_response:true }...: avg=559.82ms min=52.65ms med=555.58ms p(95)=696.9ms  p(99)=1.08s   
     http_req_failed................: 0.00%  ✓ 0          ✗ 1821 
     http_req_receiving.............: avg=524.92µs min=76.59µs med=273.1µs  p(95)=1.97ms   p(99)=2.79ms  
     http_req_sending...............: avg=34.95µs  min=9.7µs   med=23.2µs   p(95)=79.3µs   p(99)=127.48µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       p(95)=0s       p(99)=0s      
     http_req_waiting...............: avg=559.26ms min=50.39ms med=555.13ms p(95)=695.92ms p(99)=1.07s   
     http_reqs......................: 1821   173.377483/s
     iteration_duration.............: avg=563.1ms  min=83.47ms med=555.78ms p(95)=697.59ms p(99)=1.11s   
     iterations.....................: 1821   173.377483/s
     vus............................: 100    min=100      max=100
     vus_max........................: 100    min=100      max=100

Main Page:

     data_received..................: 32 MB  3.0 MB/s
     data_sent......................: 209 kB 20 kB/s
     http_req_blocked...............: avg=2.43ms   min=1.6µs   med=3µs      p(95)=22.41ms  p(99)=53.04ms
     http_req_connecting............: avg=2.42ms   min=0s      med=0s       p(95)=22.28ms  p(99)=52.86ms
     http_req_duration..............: avg=512.56ms min=27.64ms med=499.97ms p(95)=591.27ms p(99)=1.04s  
       { expected_response:true }...: avg=512.56ms min=27.64ms med=499.97ms p(95)=591.27ms p(99)=1.04s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 1989 
     http_req_receiving.............: avg=471µs    min=58.6µs  med=275.6µs  p(95)=1.77ms   p(99)=2.22ms 
     http_req_sending...............: avg=20.78µs  min=8.69µs  med=14.7µs   p(95)=54.66µs  p(99)=99.57µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       p(95)=0s       p(99)=0s     
     http_req_waiting...............: avg=512.06ms min=25.38ms med=499.57ms p(95)=590.31ms p(99)=1.03s  
     http_reqs......................: 1989   189.243585/s
     iteration_duration.............: avg=515.13ms min=67.39ms med=500.36ms p(95)=591.41ms p(99)=1.08s  
     iterations.....................: 1989   189.243585/s
     vus............................: 100    min=100      max=100
     vus_max........................: 100    min=100      max=100

Exercise page:

     data_received..................: 15 MB  1.4 MB/s
     data_sent......................: 356 kB 34 kB/s
     http_req_blocked...............: avg=1.86ms   min=1.5µs   med=2.7µs    p(95)=16.84µs  p(99)=53.63ms 
     http_req_connecting............: avg=1.85ms   min=0s      med=0s       p(95)=0s       p(99)=53.54ms 
     http_req_duration..............: avg=386.31ms min=26.4ms  med=380.18ms p(95)=446.59ms p(99)=663.71ms
       { expected_response:true }...: avg=386.31ms min=26.4ms  med=380.18ms p(95)=446.59ms p(99)=663.71ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 2618 
     http_req_receiving.............: avg=160.91µs min=47.1µs  med=130.3µs  p(95)=309.33µs p(99)=858.16µs
     http_req_sending...............: avg=19.74µs  min=7.4µs   med=12.8µs   p(95)=53.2µs   p(99)=100.73µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       p(95)=0s       p(99)=0s      
     http_req_waiting...............: avg=386.13ms min=26.04ms med=380.01ms p(95)=446.44ms p(99)=663.56ms
     http_reqs......................: 2618   253.190106/s
     iteration_duration.............: avg=388.29ms min=69.58ms med=380.33ms p(95)=447.01ms p(99)=708.03ms
     iterations.....................: 2618   253.190106/s
     vus............................: 100    min=100      max=100
     vus_max........................: 100    min=100      max=100

Overall, all of the three endpoints handled the load quite well. Average requests per second varied between 175-250. 
That is reasonable time and from it is able to predict that the server would handle more load that is possible on exercise platform.
The average request duration varied between 386 and 559 that is still quite fast and does not disturb user experience. Same can be said with the worst p(99) result that was found on grader's post request 1.08s. The grader itself will propably be slower than that so that is minor problem.

# Performance improvements for future
As I previously stated, The overall performance was quite good as I used message queue, submission caching and server side render to decrease time and to upgrade user experience.
The main improvement could still be made with the queue as it is single threaded.
Increasing it's capasity could increase the amount of submissions graded at the same time.
However, it should be tested what is the correct number of concurrent threads as too many can take up too much memory from the server.
Also one possible way to increase performance could be to benchmark and compare different frameworks both on frontend and backend.
One great alternative could be svelte.