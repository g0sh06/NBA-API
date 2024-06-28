async function fetchData() {
    try {
        const name = document.getElementById("name").value.toLowerCase();
        const response = await fetch(`https://nba-stats-db.herokuapp.com/api/playerdata/name/${name}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const finalData = data.results;

        // Clear all elements 
        const container = document.querySelector('.container2');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';

        if (finalData.length === 0) {
            displayError();
        } else {
            container.innerHTML = `
        <section id="imgWrapper" class="img-wrapper">
                <img id="nbaImage" src="public/nba.jpg" alt="nba" class="rounded object-scale-down drop-shadow-md" style="height: 250px;">
            </section>
            <section class="data-wrapper" id="dataWrapper"></section>
        `;
            const mainContainer = document.querySelector('.main-container');
            mainContainer.remove();
            displayData(finalData);
        }
    } catch (error) {
        console.log(error);
        displayError();
    }
}

function displayData(data) {
    const dataWrapper = document.getElementById('dataWrapper');

    data.forEach(item => {
        const userSection = document.createElement('section');
        userSection.style.fontSize = '22px';
        userSection.style.display = 'flex';
        userSection.style.flexDirection = 'column';
        userSection.style.alignItems = 'center';
        userSection.innerHTML = `
            <details>
                <summary style="background-color: #d46a6a; width: 375px; border-radius: 10px; padding: 5px; text-align: center;">
                    Name: ${item.player_name} | Season: ${item.season}
                </summary>
                <section style="background-color: #d46a6a; width: 375px; border-radius: 10px; padding: 5px; margin-top: 5px;">
                    Games played: ${item.games}
                </section>
                <section style="background-color: #d46a6a; width: 375px; border-radius: 10px; padding: 5px; margin-top: 5px;">
                    Field percentage: ${item.field_percent}
                </section>
                <section style="background-color: #d46a6a; width: 375px; border-radius: 10px; padding: 5px; margin-top: 5px;">
                    Team: ${item.team}
                </section>
                <section style="background-color: #d46a6a; width: 375px; border-radius: 10px; padding: 5px; margin-top: 5px;">
                    Three point percentage: ${item.three_percent}
                </section>
                <section style="background-color: #d46a6a; width: 375px; border-radius: 10px; padding: 5px; margin-top: 5px;">
                    Free throw percentage: ${item.ft_percent}
                </section>
            </details>
            <br>`;

        // Append the userSection to the dataWrapper
        dataWrapper.appendChild(userSection);
    });
}

function displayError() {
    const container = document.querySelector('.container2');
    container.innerHTML += `
        <section class="error-message" style="color: whitesmoke; font-size: 24px; margin-top: 20px;">
            Player data not found. Please check the name and try again.
        </section>
    `;
}
