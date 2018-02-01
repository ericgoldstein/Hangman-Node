var Word = require('./word.js');
var prompt = require('prompt');
var letter = require('./letter.js');

console.log("Welcome to State Hangman!");
console.log("Guess a letter of the name of a State in USA");
console.log("Goodluck!");
console.log("-----------------------------");
prompt.start();



game = {
 	wordBank: ['colorado', 'washington', 'maine', 'califorina', 'texas', 'hawaii', 'nevada', 'arizona'],
 	wordsWon: 0,
 	guessesRemaining: 10,
 	currentWrd: null,
 	
 	startGame: function (wrd) {
 		const that = this;
 		this.resetGuesses();
 		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
 		// console.log('here is my this',this);

 		const getBlanks = () => {
 			const blanks =[];
 			// console.log('here is the word length', that.currentWrd.target.length);
 			for(let i = 0; i < that.currentWrd.target.length; i++) {
 				blanks.push('_');
 			}
 			console.log(blanks.join(' '));
 			return blanks;
 		};
 		getBlanks();
 		this.currentWrd.getLet();
 		this.promptUser();
 	},

 	resetGuesses: function(){
 		this.guessesRemaining = 10;
 	},

 	promptUser: function(){
 		var self = this;
 		prompt.get(['guessLet'], function(err, result){
 			console.log("You guessed: " + result.guessLet);
 			var manyGuessed = self.currentWrd.checkLetter(result.guessLet);

 			if(manyGuessed ==0) {
 				console.log("WRONG");
 				self.guessesRemaining--;
 				
 			} else {
 				console.log("CORRECT");
 					if(self.currentWrd.findWord()){
 						console.log("You won!");
 						console.log("-------------------");
 						return;
 					}
 			}

 			console.log("Guesses remaining: " + self.guessesRemaining);
 			console.log("-------------------");
 			if((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
 				self.promptUser();
 			}
 			else if(self.guessesRemaining ==0){
 				console.log("Game over. Correct Word ", self.currentWrd.target);
 			} else {
 				console.log(self.currentWrd.wordRender());
 			}
 		});

 	}


};

game.startGame();

