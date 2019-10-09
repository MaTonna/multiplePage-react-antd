import React, { Component, Fragment } from 'react';

type Props = {
  title: string
  volume: number
  lastMonthVolume: number
}
const initialState = {

}
type State = Readonly<typeof initialState>;

class VolumeCard extends Component<Props, State> {
  readonly state: State = initialState;

  render() {
    const { title, volume, lastMonthVolume } = this.props;
    const deltaVolume = volume - lastMonthVolume;
    const positiveNum = Math.abs(deltaVolume);
    return (
      <div className="base-card small-card">
        <h3 className="card-title">{title}</h3>
        <p className="volume">¥{volume}</p>
        <p>距上月销售额：<span className="volume">{lastMonthVolume}</span></p>
        {deltaVolume >= 0 ? <p>
          已超<span className="volume-over">¥{positiveNum}</span>
        </p> : <p>
            还差<span className="volume-short">¥{positiveNum}</span>
          </p>}
      </div>
    )
  }
}

export default VolumeCard;
