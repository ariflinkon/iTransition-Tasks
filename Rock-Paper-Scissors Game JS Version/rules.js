class Rules {
    constructor(moves) {
        this.moves = moves;
    }

    getWinner(playerMove, computerMove) {
        const playerIndex = this.moves.indexOf(playerMove);
        const computerIndex = this.moves.indexOf(computerMove);

        if (playerIndex === computerIndex) {
            return 'Draw';
        }

        const half = Math.floor(this.moves.length / 2);
        if ((playerIndex > computerIndex && playerIndex - computerIndex <= half) ||
            (playerIndex < computerIndex && computerIndex - playerIndex > half)) {
            return 'Player wins';
        } else {
            return 'Computer wins';
        }
    }
}