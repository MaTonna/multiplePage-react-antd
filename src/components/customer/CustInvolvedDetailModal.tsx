/*
 * @Description: 客户关联申请-详情弹窗
 * @Author: xiaoya
 * @Date: 2019-10-15 17:07:48
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-16 12:01:40
 */
import React, { ReactNode, Component } from 'react';
import { Modal, Button } from 'antd';
import ImgsPreviewModal from '@components/ImgsPreviewModal';

const initialState = {
  isShowSilderModal: false,
  sliderPicSrcs: []
};

type Props = {
  visible: boolean
  closeModal: Function
};

type State = Readonly<typeof initialState>;

const testPicSrc = "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
/**
 * 客户关联申请-详情弹窗
 */
class CustInvolvedDetailModal extends Component<Props, State> {

  readonly state: State = initialState;

  infoList = [];

  componentDidMount() {
    this.infoList = [
      {
        title: '客户信息',
        infos: [
          {
            label: '用户名',
            value: '吉米'
          }, {
            label: '归属销售',
            value: 'admin'
          }, {
            label: '客户类型',
            value: '客户池2'
          }
        ]
      },
      {
        title: '申请信息',
        infos: [
          {
            label: '申请销售',
            value: '希达'
          }, {
            label: '申请时间',
            value: '2019-10-15 17:53:20'
          }, {
            label: '审核状态',
            value: '未审核'
          }, {
            label: '关联原因',
            value: '不想关联'
          }, {
            label: '变更前销售',
            value: 'admin'
          }, {
            label: '变更后销售',
            value: '希达'
          }, {
            label: '审核备注',
            value: '他有钱'
          }, {
            label: '截图1',
            value: <img className="apply-pic" src={testPicSrc} onClick={() => this.showSilderPics('applyInfo')} />
          }, {
            label: '截图2',
            value: <img className="apply-pic" src={testPicSrc} onClick={() => this.showSilderPics('applyInfo')} />
          }
        ]
      }
    ]
  }

  handleCancel = (): void => {
    this.props.closeModal();
  };

  showSilderPics = (type) => {
    this.setState({
      isShowSilderModal: true,
      sliderPicSrcs: [testPicSrc]
    })
  }

  render(): ReactNode {
    const { infoList } = this;
    const { isShowSilderModal, sliderPicSrcs } = this.state;
    const { visible } = this.props;
    return (
      <Modal
        title="详情"
        visible={visible}
        width={700}
        onCancel={this.handleCancel}
        footer={<Button type="primary" onClick={this.handleCancel}>确定</Button>}
      >
        <div className="split-wrap" style={{ height: '400px' }}>
          {
            infoList.map(item => {
              return <div className="split-block info-block" key={item.title}>
                <h3>{item.title}</h3>
                {
                  item.infos.map(info => {
                    const { label, value } = info;
                    return <p key={info.label}>
                      <label>{label}：</label>
                      <span>{value}</span>
                    </p>
                  })
                }
              </div>
            })
          }
        </div>
        <ImgsPreviewModal
          visible={isShowSilderModal}
          closeModal={() => { this.setState({ isShowSilderModal: false }) }}
          sliderPicSrcs={sliderPicSrcs}
        />
      </Modal>
    );
  }
}

export default CustInvolvedDetailModal;
