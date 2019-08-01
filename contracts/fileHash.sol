pragma solidity 0.5.1;


contract FileHash {

    address owner;

    struct fileInfo {
        bool isExist;
        string filename;
        string hash;
        string createdAt;
        string updatedAt;
        string createdBy;
        string updatedBy;
        mapping(string => mapping(string => bool)) userAccess;

    }

    string[] str;

    mapping(string => mapping(string => fileInfo)) userFiles;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }


    constructor() public
    {
        owner = msg.sender;
        str = ["READ", "EDIT", "COPY", "SCREENSHOT", "WATERMARK", "SAVEAS"];
    }


    function provideAccess(string memory _filename, string memory _createdBy, string memory _email, string memory _accessStr, uint[] memory _ass) public onlyOwner
    returns (bool) {
        require(userFiles[_createdBy][_filename].isExist, "File do not exist");
        // require( !userFiles[_createdBy][_filename].userAccess[_email][_ass], "Already have access");
        require(keccak256(abi.encodePacked(_accessStr)) == keccak256("GIVE") ||
        keccak256(abi.encodePacked(_accessStr)) == keccak256("REVOKE"), "ACCESS string not valid, GIVE/REVOKE");

        require(_ass.length <= 6, "ACCESS string not valid, READ/EDIT/COPY/SCREENSHOT/WATERMARK/SAVEAS");

        for (uint i = 0; i < _ass.length; i++) {
            if (keccak256(abi.encodePacked(_accessStr)) == keccak256("GIVE")) {
                userFiles[_createdBy][_filename].userAccess[_email][str[_ass[i]]] = true;
            } else if (keccak256(abi.encodePacked(_accessStr)) == keccak256("REVOKE")) {
                userFiles[_createdBy][_filename].userAccess[_email][str[_ass[i]]] = false;
            }
        }


        return true;
    }

    function getAccess(string memory _filename, string memory _createdBy, string memory _email, uint  _ass) public view returns (bool access_) {

        access_ = userFiles[_createdBy][_filename].userAccess[_email][str[_ass]];

    }


    function createFile(string memory _filename, string memory _createdAt, string memory _createdBy, string memory _hash) public onlyOwner returns (bool) {
        require(!userFiles[_createdBy][_filename].isExist, "Filename already Exist for the user");

        userFiles[_createdBy][_filename].isExist = true;
        userFiles[_createdBy][_filename].filename = _filename;
        userFiles[_createdBy][_filename].hash = _hash;
        userFiles[_createdBy][_filename].createdAt = _createdAt;
        userFiles[_createdBy][_filename].updatedAt = _createdAt;
        userFiles[_createdBy][_filename].createdBy = _createdBy;
        userFiles[_createdBy][_filename].updatedBy = _createdBy;

        userFiles[_createdBy][_filename].userAccess[_createdBy][str[0]] = true;
        userFiles[_createdBy][_filename].userAccess[_createdBy][str[1]] = true;
        userFiles[_createdBy][_filename].userAccess[_createdBy][str[2]] = true;
        userFiles[_createdBy][_filename].userAccess[_createdBy][str[3]] = true;
        userFiles[_createdBy][_filename].userAccess[_createdBy][str[4]] = true;
        userFiles[_createdBy][_filename].userAccess[_createdBy][str[5]] = true;

        return true;
    }

    function updateFile(string memory _filename, string memory _createdBy, string memory _updatedAt,
        string memory _updatedBy, string memory _hash) public onlyOwner returns (bool) {

        require(userFiles[_createdBy][_filename].isExist, "File do not exist");
        require(userFiles[_createdBy][_filename].userAccess[_updatedBy]['EDIT'], "Do not have edit access");

        userFiles[_createdBy][_filename].hash = _hash;

        userFiles[_createdBy][_filename].updatedAt = _updatedAt;

        userFiles[_createdBy][_filename].updatedBy = _updatedBy;

        return true;
    }

    function isFileValid(string memory _filename, string memory _createdBy, string memory _hash) public view returns (bool isValid_) {
        if (keccak256(abi.encodePacked(_hash)) == keccak256(abi.encodePacked(userFiles[_createdBy][_filename].hash))) {
            isValid_ = true;
        } else {
            isValid_ = false;
        }
    }


}
