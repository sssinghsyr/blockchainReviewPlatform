pragma solidity ^0.4.15;

contract reviewRecord
{
    struct Review {
        string prod_review;
        string prod_name;
        string prod_link;
        uint prod_price;
        string posted_date;
    }

    // Constuct
    function reviewRecord()  payable {
        databaseInit();
    }

    mapping (string => Review[]) database;

    function databaseInit () {

    }
    
    function submitReview (string user, string p_review, string p_name, string p_link,
                            uint p_price, string p_date)
        payable
    {
        Review memory record = Review(p_review,p_name,p_link,p_price,p_date);
        database[user].push(record);
    }


    // HELPER FUNCTIONS
    
    function getUserProdReview(string user, uint index)public returns(string){
        if(database[user].length == 0){
            return "No Record";
        }else{
            return database[user][index].prod_review;
        }
    }
    
    function getUserProdName(string user, uint index)public returns(string){
        if(database[user].length == 0){
            return "No Record";
        }else{
            return database[user][index].prod_name;
        }
    }
    
    function getUserProdLink(string user, uint index)public returns(string){
        if(database[user].length == 0){
            return "No Record";
        }else{
            return database[user][index].prod_link;
        }
    }
    
    function getUserProdPrice(string user, uint index)public returns(uint){
        if(database[user].length == 0){
            return 0;
        }else{
            return database[user][index].prod_price;
        }
    }

    function getUserProdDate(string user, uint index)public returns(string){
        if(database[user].length == 0){
            return "No Record";
        }else{
            return database[user][index].posted_date;
        }
    }

    function getUserReviewCount(string user)public returns(uint){
        return database[user].length;
    }

    // \HELPER FUNCTIONS
}

