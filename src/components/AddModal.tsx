import React, { ReactNode, Component } from 'react';
import { Modal } from 'antd';

const initialState = {
  confirmLoading: false,
  ModalText: ''
};

type Props = {
  visible: boolean
  closeModal: Function
};

type State = Readonly<typeof initialState>;

class AddForm extends Component<Props, State> {

  readonly state: State = initialState;

  handleOk = (): void => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = (): void => {
    this.props.closeModal();
  };

  render(): ReactNode {
    const { confirmLoading, ModalText } = this.state;
    const { visible } = this.props;
    return (
      <Modal
        title="Title"
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        <p>{ModalText}</p>
      </Modal>
    );
  }
}

export default AddForm;
