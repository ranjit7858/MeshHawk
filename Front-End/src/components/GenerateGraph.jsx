import React from 'react';
import { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';
import HighchartsExporting from 'highcharts/modules/exporting';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPcap } from '../api';

// Initialize Highcharts modules
HighchartsNetworkgraph(Highcharts);
HighchartsExporting(Highcharts);

export default function GenerateGraph({pcap, keyVar, graphHeight, graphWidth,className}) {
  const queryClient = useQueryClient();

  const url = import.meta.env.VITE_BACKEND_URL;

  const { data, isLoading, isError, height, width } = useQuery(['getpcap'], getPcap);

  const nodes = []; 
  

  
  // Update the logic for creating nodes from the pcap array of size 4
  pcap.forEach((arr) => {
    nodes.push([arr[0], arr[1]]);
    // nodes.push([arr[2], arr[3]]);
  });
  
  // pcap.forEach((el, index) => el.forEach((res, i) => (i < el.length - 2 ) && nodes.push([res, el[i+1]])))

  
  

  

  useEffect(() => {
    (function (H) {
      H.wrap(
        H.seriesTypes.networkgraph.prototype.pointClass.prototype,
        'getLinkPath',
        function (p) {
          var left = this.toNode,
            right = this.fromNode;

          var angle = Math.atan(
            (left.plotX - right.plotX) / (left.plotY - right.plotY)
          );

          if (angle) {
            let path = [
                'M',
                left.plotX,
                left.plotY,
                right.plotX,
                right.plotY,
              ],
              lastPoint = left,
              nextLastPoint = right,
              pointRadius = 25,
              arrowLength = 10,
              arrowWidth =  0;

            if (left.plotY < right.plotY) {
              path.push(
                nextLastPoint.plotX - pointRadius * Math.sin(angle),
                nextLastPoint.plotY - pointRadius * Math.cos(angle)
              );
              path.push(
                nextLastPoint.plotX -
                  pointRadius * Math.sin(angle) -
                  arrowLength * Math.sin(angle) -
                  arrowWidth * Math.cos(angle),
                nextLastPoint.plotY -
                  pointRadius * Math.cos(angle) -
                  arrowLength * Math.cos(angle) +
                  arrowWidth * Math.sin(angle)
              );

              path.push(
                nextLastPoint.plotX - pointRadius * Math.sin(angle),
                nextLastPoint.plotY - pointRadius * Math.cos(angle)
              );
              path.push(
                nextLastPoint.plotX -
                  pointRadius * Math.sin(angle) -
                  arrowLength * Math.sin(angle) +
                  arrowWidth * Math.cos(angle),
                nextLastPoint.plotY -
                  pointRadius * Math.cos(angle) -
                  arrowLength * Math.cos(angle) -
                  arrowWidth * Math.sin(angle)
              );
            } else {
              path.push(
                nextLastPoint.plotX + pointRadius * Math.sin(angle),
                nextLastPoint.plotY + pointRadius * Math.cos(angle)
              );
              path.push(
                nextLastPoint.plotX +
                  pointRadius * Math.sin(angle) +
                  arrowLength * Math.sin(angle) -
                  arrowWidth * Math.cos(angle),
                nextLastPoint.plotY +
                  pointRadius * Math.cos(angle) +
                  arrowLength * Math.cos(angle) +
                  arrowWidth * Math.sin(angle)
              );
              path.push(
                nextLastPoint.plotX + pointRadius * Math.sin(angle),
                nextLastPoint.plotY + pointRadius * Math.cos(angle)
              );
              path.push(
                nextLastPoint.plotX +
                  pointRadius * Math.sin(angle) +
                  arrowLength * Math.sin(angle) +
                  arrowWidth * Math.cos(angle),
                nextLastPoint.plotY +
                  pointRadius * Math.cos(angle) +
                  arrowLength * Math.cos(angle) -
                  arrowWidth * Math.sin(angle)
              );
            }

            return path;
          }
          return [
            ['M', left.plotX || 0, left.plotY || 0],
            ['L', right.plotX || 0, right.plotY || 0],
          ];
        }
      );
    })(Highcharts);

    const chartOptions = {
      chart: {
        type: 'networkgraph',
        backgroundColor: 'transparent',
      },
      title: {
        text: '',
      },
      plotOptions: {
        networkgraph: {
            layoutAlgorithm: {
                enableSimulation: false,
                integration: 'verlet', // Use 'verlet' to have a fixed distance between nodes
              },
          marker: {
            fillColor: 'blue',
            lineWidth: 8,
            lineColor: 'white',
            radius: 15,
            zIndex: 2,
          },
          link: {
            color: 'white',
            dashStyle: 'solid ',
            linkDirection: 'both',
            zIndex: 1,
          },
        },
      },
      series: [
        {
          dragable: false,
          dataLabels: {
            enabled: true,
            linkFormat: '',
            style: {
              
              color: 'white',
              fontSize: '16px',
              fontWeight: '',
            },
            y: -20,
          },
          id: 'lang-tree',
          data: nodes,
        },
      ],
      
    };

    Highcharts.chart(`key ${keyVar}`, chartOptions);
  }, []);

  return (
    <div
      id={`key ${keyVar}`}
      style={{
        height: graphHeight,
        width: graphWidth,
        // backgroundColor: 'white',
        // borderRadius:"1rem"
      }}
      className={`${className}`}
    ></div>
  );
}
