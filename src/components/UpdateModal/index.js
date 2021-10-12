import React from 'react'
import { Dialog, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UpdateModal = (props) => {

    const {
        state: state,
        onNo: onNo,
        onYes: onYes,
        ...rest
    } = props;

    return (
        <Dialog open={state} onClose={onNo}>
        <div className="text-center p-5">
          <div className="avatar-icon-wrapper rounded-circle m-0">
          <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-warning text-white m-0 d-130">
              <FontAwesomeIcon
                icon={['far', 'dot-circle']}
                className="d-flex align-self-center display-3"
              />
            </div>
          </div>
          <h4 className="font-weight-bold mt-4">これを更新しますか？</h4>
          <div className="pt-4">
            <Button
              onClick={onNo}
              variant="outlined"
              color="secondary"
              className="mx-1">
              <span className="btn-wrapper--label">キャンセル</span>
            </Button>
            <Button
              onClick={onYes}
              color="primary"
              variant="contained"
              className="mx-1">
              <span className="btn-wrapper--label">同意する</span>
            </Button>
          </div>
        </div>
      </Dialog>
    )
}

export default UpdateModal;