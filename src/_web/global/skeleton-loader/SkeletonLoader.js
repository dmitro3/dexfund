import React, { Component, Fragment } from 'react';
import ContentLoader from "react-content-loader"

class SkeletonLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            rowHeight: this.props.rowHeight
        }
    }

    render() {
        const { rowHeight, rows } = this.state;
        return (
            <ContentLoader 
            speed={1}
            viewBox={`0 0 1500 ${rowHeight * rows}`}
            backgroundColor="#020202"
            foregroundColor="#151515"
            {...this.props}
          >
              {new Array(rows).fill(' ').map((el, index) => {
                const contentVerticalPosition = contentHeight =>
                  rows > 1 ? contentHeight + rowHeight * index : contentHeight
                return (
                  <Fragment key={index}>
                    <rect
                      x="20"
                      y={`${contentVerticalPosition(20)}`}
                      rx="4"
                      ry="4"
                      width="40"
                      height="20"
                    />
                    <rect
                      x="100"
                      y={`${contentVerticalPosition(20)}`}
                      rx="10"
                      ry="4"
                      width="600"
                      height="20"
                    />
                    <rect
                      x="750"
                      y={`${contentVerticalPosition(20)}`}
                      rx="10"
                      ry="4"
                      width="600"
                      height="20"
                    />
                    <rect
                      x="1450"
                      y={`${contentVerticalPosition(20)}`}
                      rx="4"
                      ry="4"
                      width="20"
                      height="20"
                    />
                  </Fragment>
                )
              })}
            </ContentLoader>
          )
    }
}

export default SkeletonLoader;