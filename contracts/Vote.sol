pragma solidity ^0.5.13;


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

    
    constructor(bytes32[] memory _proposals, address _tokenCA) public {
           tokenCA = _tokenCA;
           for(uint i = 0; i < _proposals.length; i ++) {
                Proposals.push(Proposal({
            name: _proposals[i],
            voteCount: 0,
            countOfAgree: 0
        }));
           }
    }
    
    function voting( bool[] memory _votedResult) public {
        
     TokenInterface TokenContract = TokenInterface(tokenCA);
     
     uint balance = TokenContract.balanceOf(msg.sender);
    
     for (uint i = 0; i < _votedResult.length; i++){
       Proposals[i].voteCount += balance;
       if(_votedResult[i] == true){
           Proposals[i].countOfAgree += balance;
             }
        }
     }
}