pragma solidity ^0.5.0;

contract Vote {
    	
    address public voter;
    string public stock;
    
	constructor() public {
		voter = msg.sender;
	}
	
    struct JouJou {
        string name;
        uint weight;
    }
    
    JouJou[] public joujou;
    
    event EventSetVoting(string content);
        
    constructor(string memory _content, uint _weight) public {
		content = _content;
		weight = _weight;
	}
	
		function pushJouJou(string _name, uint _weight) public {
		grades.push(JouJou({ name: _name, weight: _weight }));
	}
	
	
	function setVoting(string memory _content, uint _weight) public {
		content = _content;
		weight = _weight;
	
	    emit EventSetVoting(_content);
	}
}