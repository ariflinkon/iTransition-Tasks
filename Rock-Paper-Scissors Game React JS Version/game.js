const crypto = require('crypto');
const readline = require('readline');
const AsciiTable = require('ascii-table'); // Import ascii-table package

class GameRules {
    constructor(moves) {
        this.moves = moves;
        this.numMoves = moves.length;
    }

    determineOutcome(playerMove, computerMove) {
        const playerIndex = this.moves.indexOf(playerMove);
        const computerIndex = this.moves.indexOf(computerMove);

        if (playerIndex === computerIndex) return 'Draw';

        const half = Math.floor(this.numMoves / 2);
        const winMoves = Array.from({ length: half }, (_, i) => (computerIndex + 1 + i) % this.numMoves);

        if (winMoves.includes(playerIndex)) {
            return 'Win';
        } else {
            return 'Lose';
        }
    }
}

class HMACGenerator {
    static generateKey() {
        return crypto.randomBytes(32).toString('hex');  // 256-bit key
    }

    static generateHMAC(key, move) {
        return crypto.createHmac('sha256', key).update(move).digest('hex');
    }
}

class HelpTable {
    static generate(moves) {
        const size = moves.length;
        const table = new AsciiTable('Help Table: PC vs User'); // Create a new table

        // Set headers with move names
        table.setHeading(['PC\\User >'].concat(moves));

        // Populate rows with Win/Lose/Draw values
        for (let i = 0; i < size; i++) {
            const row = [moves[i]];
            for (let j = 0; j < size; j++) {
                if (i === j) {
                    row.push('Draw');
                } else {
                    const half = Math.floor(size / 2);
                    if ((j > i && j <= i + half) || (j + size <= i + half)) {
                        row.push('Win');
                    } else {
                        row.push('Lose');
                    }
                }
            }
            table.addRow(row);
        }

        return table.toString(); // Convert table to string for display
    }
}

class Game {
    constructor(moves) {
        this.moves = moves;
        this.rules = new GameRules(moves);
        this.key = HMACGenerator.generateKey();
        this.computerMove = moves[Math.floor(Math.random() * moves.length)];
        this.hmac = HMACGenerator.generateHMAC(this.key, this.computerMove);
    }

    showMenu() {
        console.log(`HMAC: ${this.hmac}`);
        console.log('Available moves:');
        this.moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
        console.log('0 - exit');
        console.log('? - help');
    }

    play() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.showMenu();

        rl.question('Enter your move: ', (input) => {
            if (input === '0') {
                rl.close();
                return;
            } else if (input === '?') {
                console.log(HelpTable.generate(this.moves));
                rl.close();
                return;
            }

            const playerMoveIndex = parseInt(input) - 1;
            if (isNaN(playerMoveIndex) || playerMoveIndex < 0 || playerMoveIndex >= this.moves.length) {
                console.log('Invalid move! Try again.');
                rl.close();
                return;
            }

            const playerMove = this.moves[playerMoveIndex];
            console.log(`Your move: ${playerMove}`);
            console.log(`Computer move: ${this.computerMove}`);

            const result = this.rules.determineOutcome(playerMove, this.computerMove);
            console.log(`You ${result.toLowerCase()}!`);
            console.log(`HMAC key: ${this.key}`);

            rl.close();
        });
    }
}

// Command-line argument validation
const args = process.argv.slice(2);
if (args.length < 3 || args.length % 2 === 0 || new Set(args).size !== args.length) {
    console.error('Error: Please provide an odd number of non-repeating moves (3 or more).');
    console.error('Example: node game.js rock paper scissors');
    process.exit(1);
}

// Start the game
const game = new Game(args);
game.play();
