// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Decentraskill {
    company[] public companies;
    user[] public employees;
    mapping(string => address) public email_to_address;
    mapping(address => uint256) public address_to_id;
    mapping(address => bool) public is_company;

    struct company {
        uint256[] current_employees;
        uint256[] previous_employees;
        address wallet_address;
        uint256 id;
    }

    struct certificate {
        string url;
        string issue_date;
        string valid_till;
        string name;
        string id;
        string issuer;
    }

    struct endorsment {
        string endorser_id;
        string date;
        string comment;
    }

    struct experience {
        string starting_date;
        string ending_date;
        bool currently_working;
        string company_id;
    }

    struct skill {
        string name;
        bool verified;
        uint256 num_certificates;
        mapping(uint256 => certificate) certifications;
        uint256 num_endorsements;
        mapping(uint256 => endorsment) endorsements;
    }

    struct user {
        uint256 id;
        uint256 company_id;
        address wallet_address;
        bool is_employed;
        bool is_manager;
        uint256 num_skill;
        mapping(uint256 => skill) skills;
        uint256 num_experience;
        mapping(uint256 => experience) work_experience;
    }

    function memcmp(bytes memory a, bytes memory b)
        internal
        pure
        returns (bool)
    {
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

    function strcmp(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return memcmp(bytes(a), bytes(b));
    }

    function sign_up(string calldata email, string calldata acc_type) public {
        require(email_to_address[email] == address(0));
        email_to_address[email] = msg.sender;

        if (strcmp(acc_type, "user")) {
            user storage new_user = employees.push();
            new_user.id = employees.length - 1;
            new_user.wallet_address = msg.sender;
            address_to_id[msg.sender] = new_user.id;
        } else {
            company storage new_company = companies.push();
            new_company.id = companies.length - 1;
            new_company.wallet_address = msg.sender;
            new_company.current_employees = new uint256[](0);
            new_company.previous_employees = new uint256[](0);
            address_to_id[msg.sender] = new_company.id;
            is_company[msg.sender] = true;
        }
    }

    function add_employee_to_company(uint256 employee_id, uint256 company_id)
        public
    {
        require(
            employees[address_to_id[msg.sender]].is_manager ||
                is_company[msg.sender]
        );
        companies[company_id].current_employees.push(employee_id);
        employees[employee_id].is_employed = true;
        employees[employee_id].company_id = company_id;
    }
}
