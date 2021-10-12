import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Divider
} from '@material-ui/core';

import NormalButton from 'components/NormalButton';
import OneInputText from 'components/OneInputText';
import { Link, useHistory } from 'react-router-dom';
import TextArea from 'components/TextArea';
import { apiCreateEnum } from 'services/apis/enums';
import SaveModal from 'components/SaveModal';

function AddForm() {

    let history = useHistory();

    const [id, setId] = useState("");
    const handleId = event => {
        setId(event.target.value);
    };

    const [value, setValue] = useState("");
    const handleValue = event => {
        setValue(event.target.value);
    };

    const [name, setName] = useState("");
    const handleName = event => {
        setName(event.target.value);
    };

    const [description, setDescription] = useState("");
    const handleDescription = event => {
        setDescription(event.target.value);
    };

    const [displayweight, setDisplayWeight] = useState("");
    const handleDisplayWeight = event => {
        setDisplayWeight(event.target.value);
    };

    const [status, setStatus] = useState("");
    const handleStatus = event => {
        setStatus(event.target.value);
    };

    const onEnumCreate = () => {

        toggle();

        var data = {
            enum_id: id,
            value: Number(value),
            name: name,
            description: description,
            view_weight: Number(displayweight),
            status: Number(status)
        }

        console.log(data);

        apiCreateEnum(data)
            .then(res => {
                if (res) {
                    history.push('/AdminEnums')
                }
            })
            .catch(function (error) {
                // Handle Errors here.
                console.log('===== error: ', error);
                // ...
            });

    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <Card className="p-4 mb-4">
            <div className="font-size-lg font-weight-bold">Add New Enum</div>
            <Divider className="my-4" />
            <div>
                <OneInputText label="ID" value={id} changeAction={handleId} type="number" />
                <OneInputText label="値" value={value} changeAction={handleValue} type="number" />
                <TextArea label="名称" value={name} changeAction={handleName} />
                <TextArea label="説明" value={description} changeAction={handleDescription} />
                <OneInputText label="表示重み" value={displayweight} changeAction={handleDisplayWeight} type="number" />
                <OneInputText label="ステータス" value={status} changeAction={handleStatus} type="number" />
            </div>
            <div>
                <NormalButton label="更　新" onClick={toggle} />
                <Link to="/AdminEnums">
                    <NormalButton label="戻　る" />
                </Link>
                <SaveModal state={modal} onNo={toggle} onYes={onEnumCreate} />
            </div>
        </Card>
    );
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
