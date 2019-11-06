pragma solidity ^0.5.0;

import './ERC20.sol';

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

  struct Holder {
    // string holdersName; // 주주이름
    bytes32 id; // 주민번호 해쉬화해서 저장
    uint stockAmount;  // 주식 보유량 
  }

  Holder[] public holders; // holders에 Holder를 배열로 기록한다

  mapping(address => Holder) public certHolders; // 인증된 사용자의 주소를 담는다.

  // 2. 이벤트 정의
  // 송금이 완료되었을 때 보낸 사람 주소, 받는 사람 주소, 금액을 통지하는 이벤트
  event Sent(address indexed from, address indexed to, uint amount);

  // 초기값 설정
  constructor(string memory _corporation, string memory _name, string memory _symbol, uint _decimals, uint _initialSupply, bytes32[] memory _holdersId, uint[] memory _holdersAmount) public {
    require(initialSupply < 1e60);
    minter = msg.sender;
    corporation = _corporation;
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    initialSupply = _initialSupply;
     _mint(minter, initialSupply);


    // 배열로 받은 주주 리스트를 반복문을 통해 Holder 구조체에 담고 Holders 리스트에 배열로 기록한다.
    for (uint i = 0; i < _holdersId.length; i++) {
        holders.push(Holder({
            id: _holdersId[i],
            stockAmount: _holdersAmount[i]
        }));
    }
  }

  // 추가발행
  function mint(uint _additionalSupply) public {
    require(minter == msg.sender);
    _mint(minter, _additionalSupply);
  }

  // 명부에 사용자가 있으면 주식수만큼 수령하기
  function transferById(bytes32 _holdersId) public returns (bool) {
    // 반복문을 통해 holders에서 holdersId와 일치하는 holder를 찾고 인증된 사용자로 등록한다.
    bool isAuth = false;
    for (uint i = 0; i < holders.length; i++){
      bytes32 id = holders[i].id;
      if(id == _holdersId){
        certHolders[msg.sender] = holders[i];
        delete holders[i]; // 인증된 주주에 담은뒤 추가 인출이 안되도록 기존 주주 명부 목록에서 삭제한다.
        isAuth = true;
      }
    }

    // 만약 인증이 되었다면 수령하기 위해 송금절차를 따른다.
    require(isAuth == true);
    _transfer(minter, msg.sender, certHolders[msg.sender].stockAmount);
    return true;

  }
}