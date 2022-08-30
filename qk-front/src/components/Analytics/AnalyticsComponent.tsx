import React from "react"

import {
   ArcElement,
   BarElement,
   CategoryScale,
   Chart,
   Legend,
   LinearScale,
   LineElement,
   PointElement,
   Title,
   Tooltip
} from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"

import {
   colorBlack300,
   colorBrandBlue24,
   colorBrandBlue25,
   colorDanger,
   colorPending,
   colorSuccess
} from "@constants/styles"
import { Heading, Text } from "@lib/components"

import type { AnalyticsComponentType } from "@customTypes/components"

import styles from "./AnalyticsComponent.module.scss"

Chart.register(
   BarElement,
   ArcElement,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
)

export const AnalyticsComponent: React.FC<AnalyticsComponentType> = ({ statsData }): JSX.Element => {

   const handleCountPercent = (total: number, active: number): string => {
      return `${(active / total * 100).toFixed(1)}%`
   }

   const dataActivated = React.useMemo(() => {
      return {
         labels: [
            "Activated",
            "Pending"
         ],
         datasets: [{
            label: "Qualifications Activated",
            data: [statsData.activatedQualifications, (statsData.totalQualifications - statsData.activatedQualifications)],
            backgroundColor: [colorSuccess, colorBlack300],
            hoverOffset: 3
         }],
      }
   }, [statsData])

   const pluginActivated = React.useMemo(() => {
      return [{
         id: "custom_text_chart_activated",
         beforeDraw: (chart: Chart): void => {

            const width = chart.width,
               height = chart.height,
               ctx = chart.ctx
            ctx.restore()

            const fontSize = (height / 160).toFixed(2)
            ctx.font = `${fontSize}em Montserrat, sans-serif`
            ctx.textBaseline = "top"

            const text = handleCountPercent(statsData.totalQualifications - statsData.activatedQualifications, statsData.activatedQualifications),
               textX = Math.round((width - ctx.measureText(text).width) / 2),
               textY = height / 2
            ctx.fillText(text, textX, textY)
            ctx.save()
         }
      }]
   }, [statsData])

   const dataShared = React.useMemo(() => {
      return {
         labels: [
            "Shared",
            "Total"
         ],
         datasets: [{
            label: "Qualifications Shared",
            data: [statsData.sharedQualifications, statsData.totalQualifications],
            backgroundColor: [colorBrandBlue24, colorBlack300],
            hoverOffset: 3
         }]
      }
   }, [statsData])

   const pluginShared = React.useMemo(() => {
      return [{
         id: "custom_text_chart_shared",
         beforeDraw: (chart: Chart): void => {

            const width = chart.width,
               height = chart.height,
               ctx = chart.ctx
            ctx.restore()

            const fontSize = (height / 160).toFixed(2)
            ctx.font = `${fontSize}em Montserrat, sans-serif`
            ctx.textBaseline = "top"

            const text = handleCountPercent(statsData.totalQualifications, statsData.sharedQualifications),
               textX = Math.round((width - ctx.measureText(text).width) / 2),
               textY = height / 2
            ctx.fillText(text, textX, textY)
            ctx.save()
         }
      }]
   }, [statsData])

   const dataEdited = React.useMemo(() => {
      return {
         labels: [
            "Edited",
            "Total"
         ],
         datasets: [{
            label: "Qualifications Edited",
            data: [statsData.editedQualifications, statsData.totalQualifications],
            backgroundColor: [colorPending, colorBlack300],
            hoverOffset: 3
         }]
      }
   }, [statsData])

   const pluginEdited = React.useMemo(() => {
      return [{
         id: "custom_text_chart_edited",
         beforeDraw: (chart: Chart): void => {

            const width = chart.width,
               height = chart.height,
               ctx = chart.ctx
            ctx.restore()

            const fontSize = (height / 160).toFixed(2)
            ctx.font = `${fontSize}em Montserrat, sans-serif`
            ctx.textBaseline = "top"

            const text = handleCountPercent(statsData.totalQualifications, statsData.editedQualifications),
               textX = Math.round((width - ctx.measureText(text).width) / 2),
               textY = height / 2
            ctx.fillText(text, textX, textY)
            ctx.save()
         }
      }]
   }, [statsData])

   const dataWithdrawn = React.useMemo(() => {
      return {
         labels: [
            "Deleted",
            "Total"
         ],
         datasets: [{
            label: "Qualifications Deleted",
            data: [statsData.deletedQualifications, statsData.totalQualifications],
            backgroundColor: [colorDanger, colorBlack300],
            hoverOffset: 3
         }]
      }
   }, [statsData])

   const pluginWithdrawn = React.useMemo(() => {
      return [{
         id: "custom_text_chart_withdrawn",
         beforeDraw: (chart: Chart): void => {

            const width = chart.width,
               height = chart.height,
               ctx = chart.ctx
            ctx.restore()

            const fontSize = (height / 160).toFixed(2)
            ctx.font = `${fontSize}em Montserrat, sans-serif`
            ctx.textBaseline = "top"

            const text = handleCountPercent(statsData.totalQualifications, statsData.deletedQualifications),
               textX = Math.round((width - ctx.measureText(text).width) / 2),
               textY = height / 2
            ctx.fillText(text, textX, textY)
            ctx.save()
         }
      }]
   }, [statsData])

   const minutes = React.useMemo(() => {
      return statsData.sharedQualifications * 10
   }, [statsData])

   const hours = React.useMemo(() => {
      return minutes / 60
   }, [minutes])

   const days = React.useMemo(() => {
      return hours / 8
   }, [hours])

   const emails = React.useMemo(() => {
      return statsData.sharedQualifications * 3
   }, [statsData])

   const savedTimeData = React.useMemo(() => {
      return {
         labels: [
            "Minutes Saved",
            "Hours Saved",
            "Days Saved",
            "Email Prevented"
         ],
         datasets: [{
            axis: "y",
            label: "Saved Time",
            data: [
               minutes, hours, days, emails
            ],
            fill: true,
            backgroundColor: [
               colorBrandBlue24,
               "#EBC454",
               "#57D19E",
               colorBrandBlue25
            ]
         }]
      }
   }, [minutes, hours, days, emails])

   return (
      <div className={styles.wrapper}>
         <div>
            <div className={styles.data}>
               <Heading color="800" component="p" size="sm">
                  Qualifications Data
               </Heading>
               <div className={styles.dataWrapper}>
                  <div className={styles.dataItem}>
                     <Heading color="800" component="p" size="sm">
                        {statsData.totalQualifications}
                     </Heading>
                     <div>
                        <svg fill="none" height="49" viewBox="0 0 48 49"
                             width="48" xmlns="http://www.w3.org/2000/svg">
                           <path d="M37.5 42.5H10.5C10.1022 42.5 9.72064 42.342 9.43934 42.0607C9.15804 41.7794 9 41.3978 9 41V8C9 7.60218 9.15804 7.22064 9.43934 6.93934C9.72064 6.65804 10.1022 6.5 10.5 6.5H28.5L39 17V41C39 41.3978 38.842 41.7794 38.5607 42.0607C38.2794 42.342 37.8978 42.5 37.5 42.5Z"
                              stroke="#16A34A" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M28.5 6.5V17H39" stroke="#16A34A" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M18.75 28.25L24 23L29.25 28.25" stroke="#16A34A" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M24 35V23" stroke="#16A34A" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                        </svg>
                        <Text color="500" component="p" size="paragraph">
                           Qualifications Uploaded
                        </Text>
                     </div>
                  </div>
                  <div className={styles.dataItem}>
                     <Heading color="800" component="p" size="sm">
                        {statsData.sharedQualifications}
                     </Heading>
                     <div>
                        <svg fill="none" height="49" viewBox="0 0 48 49"
                             width="48" xmlns="http://www.w3.org/2000/svg">
                           <path d="M12 30.5C15.3137 30.5 18 27.8137 18 24.5C18 21.1863 15.3137 18.5 12 18.5C8.68629 18.5 6 21.1863 6 24.5C6 27.8137 8.68629 30.5 12 30.5Z"
                              stroke="#0880CE" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M33 44C36.3137 44 39 41.3137 39 38C39 34.6863 36.3137 32 33 32C29.6863 32 27 34.6863 27 38C27 41.3137 29.6863 44 33 44Z"
                              stroke="#0880CE" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M33 17C36.3137 17 39 14.3137 39 11C39 7.68629 36.3137 5 33 5C29.6863 5 27 7.68629 27 11C27 14.3137 29.6863 17 33 17Z"
                              stroke="#0880CE" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M27.9555 14.2437L17.043 21.2562" stroke="#0880CE" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M17.043 27.7437L27.9555 34.7561" stroke="#0880CE" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                        </svg>
                        <Text color="500" component="p" size="paragraph">
                           Qualifications Shared
                        </Text>
                     </div>
                  </div>
                  <div className={styles.dataItem}>
                     <Heading color="800" component="p" size="sm">
                        {statsData.editedQualifications}
                     </Heading>
                     <div>
                        <svg fill="none" height="49" viewBox="0 0 48 49"
                             width="48" xmlns="http://www.w3.org/2000/svg">
                           <path d="M24 30.5H18V24.5L36 6.5L42 12.5L24 30.5Z" stroke="#EA580C" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M31.5 11L37.5 17" stroke="#EA580C" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M40.5 23V39.5C40.5 39.8978 40.342 40.2794 40.0607 40.5607C39.7794 40.842 39.3978 41 39 41H9C8.60218 41 8.22064 40.842 7.93934 40.5607C7.65804 40.2794 7.5 39.8978 7.5 39.5V9.5C7.5 9.10218 7.65804 8.72064 7.93934 8.43934C8.22064 8.15804 8.60218 8 9 8H25.5"
                              stroke="#EA580C" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                        </svg>
                        <Text color="500" component="p" size="paragraph">
                           Qualifications Edited
                        </Text>
                     </div>
                  </div>
                  <div className={styles.dataItem}>
                     <Heading color="800" component="p" size="sm">
                        {statsData.deletedQualifications}
                     </Heading>
                     <div>
                        <svg fill="none" height="49" viewBox="0 0 48 49"
                             width="48" xmlns="http://www.w3.org/2000/svg">
                           <path d="M37.5 11L10.5 38" stroke="#D6193D" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M37.5 38L10.5 11" stroke="#D6193D" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                        </svg>
                        <Text color="500" component="p" size="paragraph">
                           Qualifications Deleted
                        </Text>
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.chart}>
               <div className={styles.chartItem}>
                  <Text color="800" component="p" size="paragraph">
                     Qualifications Activated
                  </Text>
                  <Doughnut data={dataActivated} plugins={pluginActivated}/>
               </div>
               <div className={styles.chartItem}>
                  <Text color="800" component="p" size="paragraph">
                     Qualifications Shared
                  </Text>
                  <Doughnut data={dataShared} plugins={pluginShared}/>
               </div>
               <div className={styles.chartItem}>
                  <Text color="800" component="p" size="paragraph">
                     Qualifications Edited
                  </Text>
                  <Doughnut data={dataEdited} plugins={pluginEdited}/>
               </div>
               <div className={styles.chartItem}>
                  <Text color="800" component="p" size="paragraph">
                     Qualifications Withdrawn
                  </Text>
                  <Doughnut data={dataWithdrawn} plugins={pluginWithdrawn}/>
               </div>
            </div>
         </div>
         <div className={styles.productivity}>
            <Heading color="800" component="p" size="sm">
               Saved Productivity
            </Heading>
            <Bar data={savedTimeData}/>
         </div>
      </div>
   )
}