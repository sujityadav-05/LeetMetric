document.addEventListener("DOMContentLoaded", function(){


    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    //return true or false based on a regex
    function validateUsername(username){
        if(username.trim()===""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching =regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }


    async function fetchUserDetails(username) {

        try{

            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            //statsContainer.classList.add("hidden");

            // const response = await fetch(url);
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/' 
            const targetUrl = 'https://leetcode.com/graphql/';
            
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
                variables: { "username": `${username}` }
            })
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
            };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);
            if(!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData) ;

            displayUserData(parsedData);
        }
        catch(error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
    const percentage = Math.floor((solved / total) * 100);
    label.textContent = `${solved}/${total}`;

        let current = 0;
        const interval = setInterval(() => {
            if (current >= percentage) {
                clearInterval(interval);
            } else {
                current++;
                circle.style.setProperty("--progress-degree", `${current}%`);
            }
        }, 15);
    }


    function displayUserData(parsedData) {

        const profile = document.getElementById("profile");
        const profileName = document.getElementById("profile-name");
        const totalSolvedEl = document.getElementById("total-solved");
        const acceptanceRateEl = document.getElementById("acceptance-rate");
        const acceptanceFill = document.getElementById("acceptance-fill");

        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;

        const solvedEasy = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedMedium = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedHard = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        const totalSolved = solvedEasy + solvedMedium + solvedHard;

        updateProgress(solvedEasy, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedMedium, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedHard, totalHardQues, hardLabel, hardProgressCircle);

        // Profile Info
        profileName.textContent = `@${usernameInput.value}`;
        totalSolvedEl.textContent = totalSolved;
        profile.classList.remove("hidden");

        // Acceptance Rate
        const totalSubmissions =
            parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions;

        const acceptedSubmissions =
            parsedData.data.matchedUser.submitStats.acSubmissionNum[0].submissions;

        const acceptanceRate = ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1);

        acceptanceRateEl.textContent = acceptanceRate;
        acceptanceFill.style.width = `${acceptanceRate}%`;

        // Cards
        const cardsData = [
            { label: "Overall Submissions", value: totalSubmissions },
            { label: "Easy Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions },
            { label: "Medium Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions },
            { label: "Hard Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions },
        ];

        cardStatsContainer.innerHTML = cardsData.map(
            data => `
            <div class="card">
                <h4>${data.label}</h4>
                <p>${data.value}</p>
            </div>`
        ).join("");
    }


    searchButton.addEventListener("click", function(){
        const username=usernameInput.value;
        console.log(username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })

    const themeToggle = document.getElementById("theme-toggle");

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "🌙";
        }
    });

        async function getUserStats(username) {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'https://leetcode.com/graphql/';

        const response = await fetch(proxyUrl + targetUrl, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                query: `
                query userStats($username: String!) {
                matchedUser(username: $username) {
                    submitStats {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                    }
                }
                }`,
                variables: { username }
            })
        });

        const data = await response.json();

        const stats = data.data.matchedUser.submitStats.acSubmissionNum;

        return {
            easy: stats[1].count,
            medium: stats[2].count,
            hard: stats[3].count,
            total: stats[0].count
        };
    }

        document.getElementById("compare-btn").addEventListener("click", async () => {
        const user1 = document.getElementById("user1").value.trim();
        const user2 = document.getElementById("user2").value.trim();

        if (!user1 || !user2) {
            alert("Enter both usernames");
            return;
        }

        const resultBox = document.getElementById("compare-result");
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = "Comparing...";

        try {
            const stats1 = await getUserStats(user1);
            const stats2 = await getUserStats(user2);

            resultBox.innerHTML = `
                <div class="compare-row">
                    <strong>${user1}</strong>
                    <strong>${user2}</strong>
                </div>

                <div class="compare-row">
                    <span class="${stats1.easy > stats2.easy ? 'win' : 'lose'}">Easy: ${stats1.easy}</span>
                    <span class="${stats2.easy > stats1.easy ? 'win' : 'lose'}">Easy: ${stats2.easy}</span>
                </div>

                <div class="compare-row">
                    <span class="${stats1.medium > stats2.medium ? 'win' : 'lose'}">Medium: ${stats1.medium}</span>
                    <span class="${stats2.medium > stats1.medium ? 'win' : 'lose'}">Medium: ${stats2.medium}</span>
                </div>

                <div class="compare-row">
                    <span class="${stats1.hard > stats2.hard ? 'win' : 'lose'}">Hard: ${stats1.hard}</span>
                    <span class="${stats2.hard > stats1.hard ? 'win' : 'lose'}">Hard: ${stats2.hard}</span>
                </div>

                <div class="compare-row">
                    <strong class="${stats1.total > stats2.total ? 'win' : 'lose'}">
                        Total: ${stats1.total}
                    </strong>
                    <strong class="${stats2.total > stats1.total ? 'win' : 'lose'}">
                        Total: ${stats2.total}
                    </strong>
                </div>
            `;
        } catch (e) {
            resultBox.innerHTML = "Error comparing users";
        }
    });



})