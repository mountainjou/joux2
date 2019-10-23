pragma solidity ^0.5.12;

contract Token {
    // The keyword "public" makes variables
    // accessible from other contracts
    // 1. 상태 변수 선언
    address public corporationAddress; // 발행 회사 지갑 주소
    string public corporationName; // 발행 회사 이름
    string public tokenName; // 토큰 이름 (joujou)
    string public tokenSymbol; // 토큰 단위 (joux2)
    string public decimals; // 소수점 이하 자리수 (0)
    uint public totalSupply; // 전체 발행량

    // 계정별 잔액
    mapping (address => uint) public balances;
    
    // Events allow clients to react to specific
    // contract changes you declare
    // 2. 이벤트 정의
    // 송금이 완료되었을 때 보낸 사람 주소, 받는 사람 주소, 금액을 통지하는 이벤트
    event Sent(address indexed from, address indexed to, uint amount);
    
    // Constructor code is only run when the contract
    // is created
    constructor() public {
        corporationAddress = msg.sender;
    }
    
    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    // 3.생성자 정의 (코인 생성 할 때 발행하는 사람이 모두 갖기)
    function createToken(string memory _corporationName, string memory _tokenName, string memory _tokenSymbol, string memory _decimals, uint _totalSupply) public {
        require(msg.sender == corporationAddress);
        require(totalSupply < 1e60);
        corporationName = _corporationName;
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        decimals = _decimals;
        totalSupply = _totalSupply;
    
        balances[corporationAddress] += totalSupply; // 계약을 발행한 사람이 최초 총 발행량을 발급 받는다.
    }
    
     // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        //  보내는 사람 계정 잔고는 보낼 수량보다 적어야 한다. 만약 클 경우 "Insufficient balance." 메시지를 출력한다
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}