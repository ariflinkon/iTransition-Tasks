document.addEventListener('DOMContentLoaded', () => {
    const moves = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const hmac = new HMAC();
    const rules = new Rules(moves);
    const help = new Help(moves);

    const computerMove = moves[Math.floor(Math.random() * moves.length)];
    hmac.generateHMAC(computerMove).then(hmacValue => {
        document.getElementById('hmac').innerText = `HMAC: ${hmacValue}`;
    });

    const movesContainer = document.getElementById('moves');
    moves.forEach(move => {
        const button = document.createElement('button');
        button.innerText = move;
        button.addEventListener('click', () => {
            const result = rules.getWinner(move, computerMove);
            document.getElementById('result').innerText = `Computer chose: ${computerMove}\nResult: ${result}`;
            document.getElementById('hmac').innerText = `HMAC Key: ${hmac.secretKey}`;
        });
        movesContainer.appendChild(button);
    });

    document.getElementById('help-button').addEventListener('click', () => {
        const helpMenu = document.getElementById('help-menu');
        if (helpMenu.style.display === 'none') {
            help.displayHelp();
            helpMenu.style.display = 'block';
        } else {
            helpMenu.style.display = 'none';
        }
    });
});