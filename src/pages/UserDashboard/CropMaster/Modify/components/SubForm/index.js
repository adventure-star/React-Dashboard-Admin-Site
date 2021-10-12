import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Divider
} from '@material-ui/core';

import NormalButton from 'components/NormalButton';
import OneInputText from 'components/OneInputText';
import { Link } from 'react-router-dom';
import { apiCropMasterSubItemById } from 'services/apis/cropmasters';

function SubForm(props) {

    const [id, setId] = useState("");
    const handleId = event => {
        setId(event.target.value);
    };

    const [list, setList] = useState("");
    const handleList = event => {
        setList(event.target.value);
    };

    const [descriptionimage, setDescriptionImage] = useState("");

    const [description, setDescription] = useState("");
    const handleDescription = event => {
        setDescription(event.target.value);
    };

    const [creationpage, setCreationPage] = useState("");
    const handleCreationPage = event => {
        setCreationPage(event.target.value);
    };

    const [farmpage, setFarmPage] = useState("");
    const handleFarmPage = event => {
        setFarmPage(event.target.value);
    };

    const onCropMasterItemCreate = () => {

        var data = {
            id: id,
            list: list,
            description: description,
            creationpage: creationpage,
            farmpage: farmpage
        }
        console.log(data);
    }

    useEffect(() => {

        getSubItems();

    }, []);

    const getSubItems = async () => {

        const res = await apiCropMasterSubItemById(localStorage.getItem("cropmasterId"));

        console.log("=====res", res);

        setList(res.description);
        setDescriptionImage(" /mb/nae/cropInfo.jsp?uid=NULLGWDOCOMO&cropId=" + localStorage.getItem("cropmasterId"));
        setDescription(res.content);
        setCreationPage(res.prop_by_json !== null ? res.prop_by_json.newPage : "");
        setCreationPage(res.prop_by_json !== null ? res.prop_by_json.farmTop : "");

    }

    return (
        <Card className="p-4 mb-4">
            <div>
                <OneInputText label="リスト" value={list} changeAction={handleList} />
                <OneInputText label="説明" value={descriptionimage}/>
                <OneInputText label="説明" value={description} changeAction={handleDescription} />
                <OneInputText label="作成ページ" value={creationpage} changeAction={handleCreationPage} />
                <OneInputText label="農場ページ" value={farmpage} changeAction={handleFarmPage} />
            </div>
            <div>
                <NormalButton label="更　新" onClick={onCropMasterItemCreate} />
                <Link to="/UserCropMaster">
                    <NormalButton label="戻　る" />
                </Link>
            </div>
        </Card>
    );
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(SubForm);
