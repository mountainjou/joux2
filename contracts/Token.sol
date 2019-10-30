pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract Token is ERC20 {
  // The keyword "public" makes variables
  // accessible from other contracts
  // 1. 상태 변수 선언
  address public minter; // 발행 회사 지갑 주소
  string public corporation; // 발행 회사 이름
  string public name; // 토큰 이름
  string public symbol; // 심볼
  uint public decimals; // 소수점 이하 자리수
  uint public initialSupply; // 초기 발행

  struct Holders {
    // string holdersName; // 주주이름
    string id; // 주민번호 + 알파값으로 해쉬화해서 저장
    uint stockAmount;  // 주식 보유량
  }

  mapping(address => Holders) public certHolders; // 인증된 사용자의 주소를 담는다.

    // Events allow clients to react to specific
    // contract changes you declare
    // 2. 이벤트 정의
    // 송금이 완료되었을 때 보낸 사람 주소, 받는 사람 주소, 금액을 통지하는 이벤트
    event Sent(address indexed from, address indexed to, uint amount);


 constructor(string memory _corporation, string memory _name, string memory _symbol, uint _decimals, uint _initialSupply) public {
    require(initialSupply < 1e60);
    minter = msg.sender;
    corporation = _corporation;
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    initialSupply = _initialSupply;

    _mint(minter, initialSupply);
  }

    // 추가발행
    function mint(uint _additionalSupply) public {
        require(minter == msg.sender);
      _mint(minter, _additionalSupply);
    }
}