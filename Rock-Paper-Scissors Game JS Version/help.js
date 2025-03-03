class Help {
    constructor(moves) {
        this.moves = moves;
    }

    displayHelp() {
        let helpText = '<table><tr><th>Move</th>';
        this.moves.forEach(move => helpText += `<th>${move}</th>`);
        helpText += '</tr>';

        this.moves.forEach((move, i) => {
            helpText += `<tr><td>${move}</td>`;
            this.moves.forEach((_, j) => {
                if (i === j) {
                    helpText += '<td>Draw</td>';
                } else {
                    const half = Math.floor(this.moves.length / 2);
                    if ((i > j && i - j <= half) || (i < j && j - i > half)) {
                        helpText += '<td>Win</td>';
                    } else {
                        helpText += '<td>Lose</td>';
                    }
                }
            });
            helpText += '</tr>';
        });

        helpText += '</table>';
        document.getElementById('help-menu').innerHTML = helpText;
    }
}