import React, { Component, ReactNode } from 'react';
import { Modal, Button, Icon } from 'antd';
import Slider from "react-slick";

interface Prop {
  closeModal: Function
  visible: boolean
  sliderPicSrcs: any[]
}

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <Icon type="left" style={{ fontSize: '30px' }} />,
  nextArrow: <Icon type="right" style={{ fontSize: '30px' }} />,
};
/**
 * 图片预览大图可轮播
 */
class ImgsPreviewModal extends Component<Prop> {

  closeSilderModal = () => {
    this.props.closeModal();
  }

  render(): ReactNode {
    const { visible, sliderPicSrcs } = this.props;
    return (
      <Modal
        width={500}
        visible={visible}
        closable={false}
        footer={<Button type="primary" onClick={this.closeSilderModal}>关闭</Button>}
      >
        <Slider {...sliderSettings}>
          {
            sliderPicSrcs.map(item => {
              return <div key={item}>
                <img src={item} alt="" />
              </div>
            })
          }
        </Slider>
      </Modal>
    )
  }
}
export default ImgsPreviewModal;
