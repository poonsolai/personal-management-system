
function CheckEmpty(data, set){
    if(data.length == 0){
        set(true);
    }else{
        set(false);
    }
};

export default CheckEmpty;