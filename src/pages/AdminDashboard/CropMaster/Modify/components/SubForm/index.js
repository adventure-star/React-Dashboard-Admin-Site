import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Divider
} from '@material-ui/core';

import NormalButton from 'components/NormalButton';
import OneInputText from 'components/OneInputText';
import { Link } from 'react-router-dom';
import { apiCropMasterSubItemById, apiCropMasterSubItemUpdate, apiCropMasterSubItemCreate } from 'services/apis/cropmasters';

function SubForm(props) {

    const [id, setId] = useState("");

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

    useEffect(() => {

        getSubItems();

    }, []);

    const getSubItems = async () => {

        apiCropMasterSubItemById(localStorage.getItem("cropmasterId"))
        .then(res => {
            setId(res.id);
            setList(res.description);
            setDescriptionImage("/mb/nae/cropInfo.jsp?uid=NULLGWDOCOMO&cropId=" + localStorage.getItem("cropmasterId"));
            setDescription(res.content);
            setCreationPage(res.prop_by_json !== null ? res.prop_by_json.newPage : "");
            setFarmPage(res.prop_by_json !== null ? res.prop_by_json.farmTop : "");
        }).catch(function(error) {
            console.log("=====error", error);
        })

    }

    const onCropMasterItemUpdate = () => {

        var data = {
            description: list,
            content: description,
            prop_by_json: { newPage: creationpage, farmTop: farmpage }
        }

        console.log(data);

        if( id !== "") {
            apiCropMasterSubItemUpdate(id, data)
            .then(res => {
                console.log('===== res: ', res);
            })
            .catch(function (error) {
                // Handle Errors here.
                console.log('===== error: ', error);
                // ...
            });
        } else {
            apiCropMasterSubItemCreate(data)
            .then(res => {
                console.log('===== res: ', res);
            })
            .catch(function (error) {
                // Handle Errors here.
                console.log('===== error: ', error);
                // ...
            });
        }

        

    }

    return (
        <Card className="p-4 mb-4">
            {list != "" &&
                <div>
                    <OneInputText label="リスト" value={list} changeAction={handleList} />
                    <OneInputText label="説明" value={descriptionimage} />
                    <OneInputText label="説明" value={description} changeAction={handleDescription} />
                    <OneInputText label="作成ページ" value={creationpage} changeAction={handleCreationPage} />
                    <OneInputText label="農場ページ" value={farmpage} changeAction={handleFarmPage} />
                </div>
            }
            {list == "" &&
                <div>
                    <OneInputText label="リスト" value={list} changeAction={handleList} />
                    <OneInputText label="説明" value={descriptionimage} />
                    <OneInputText label="説明" value={description} changeAction={handleDescription} />
                    <OneInputText label="作成ページ" value={creationpage} changeAction={handleCreationPage} />
                    <OneInputText label="農場ページ" value={farmpage} changeAction={handleFarmPage} />
                </div>
            }

            <div>
                <NormalButton label="更　新" onClick={onCropMasterItemUpdate} />
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
