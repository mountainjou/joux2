pragma solidity ^0.5.0;


contract TokenInterface {
  function balanceOf(address account) external view returns (uint256);
}

contract Vote {
    address tokenCA;
    
    // 이것은 단일 제안에 대한 유형입니다.
    struct Proposal {
        bytes32 name;   // 간단한 명칭 (최대 32바이트)
        uint voteCount; // 누적 투표 수
        uint countOfAgree; // 찬성 수
    }
    
    Proposal[] public Proposals; // Proposals에 Proposal을 배열로 기록한다

    
    constructor(address _tokenCA) public {
           tokenCA = _tokenCA;
    }
    
    function voting(bytes32[] memory _proposals, bool[] memory _votedResult) public {
        
     TokenInterface TokenContract = TokenInterface(tokenCA);
     
     uint balance = TokenContract.balanceOf(msg.sender);
    
     for (uint i = 0; i < Proposals.length; i++){
        bytes32 name = Proposals[i].name;
        uint voteCount = Proposals[i].voteCount;
        uint countOfAgree = Proposals[i].countOfAgree;
        
        for (uint j = 0; j < _proposals.length; j++) {
            if(name == _proposals[j]){
                voteCount += balance;
                if(_votedResult[j] == 'true'){
                    countOfAgree += balance;
                }
            }
        }
     }
  }
}