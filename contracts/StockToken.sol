pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

// 1. 기업이 토큰을 발행 할 때


contract StockToken is ERC20 {
  // The keyword "public" makes variables
  // accessible from other contracts
  // 1. 상태 변수 선언
  address public corporationAddress; // 발행 회사 지갑 주소
  string public corporation; // 발행 회사 이름
  string public name; // 토큰 이름
  string public symbol; // 심볼
  uint public decimals = 18; // 소수점 이하 자리수
  uint public initialSupply; // 초기 발행

    // Events allow clients to react to specific
    // contract changes you declare
    // 2. 이벤트 정의
    // 송금이 완료되었을 때 보낸 사람 주소, 받는 사람 주소, 금액을 통지하는 이벤트
    event Sent(address indexed from, address indexed to, uint amount);


  constructor() public {
    corporationAddress = msg.sender;
  }

  // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    // 3.생성자 정의 (코인 생성 할 때 발행하는 사람이 모두 갖기)
    function publishToken(string memory _corporation, string memory _name, string memory _symbol, string memory _decimals, uint _initialSupply) public {
        require(msg.sender == corporationAddress);
        require(initialSupply < 1e60);
        corporation = _corporation;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        initialSupply = _initialSupply;

        _mint(msg.sender, initialSupply);

        // balances[corporationAddress] += totalSupply; // 계약을 발행한 사람이 최초 총 발행량을 발급 받는다.
    }
}