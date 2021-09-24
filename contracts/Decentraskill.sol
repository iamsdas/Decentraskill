// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Decentraskill {
    company[] public companies;
    user[] public employees;
    mapping(string => address) public email_to_address;

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
        certificate[] certifications;
        endorsment[] endorsements;
    }

    struct user {
        uint256 id;
        uint256 company_id;
        address wallet_address;
        bool is_employed;
        bool is_manager;
        skill[] skills;
        experience[] work_experience;
    }
}
