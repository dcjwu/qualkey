import { useState } from "react"

import Image from "next/image"

import mockImage from "../../assets/images/aboutImage.png"
import avatar from "../../assets/images/avatarMock.webp"
import qkLogo from "../../assets/images/qk-logo-text-blue.svg"
import { IconLinkedin, IconShowDropdown } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import Text from "../UI/Text/Text"
import styles from "./AboutView.module.scss"

const AboutView = () => {
   
   const [showMore, setShowMore] = useState(false)
   
   return (
      <div className={styles.wrapper}>
         {!showMore
            ? <div className={styles.page}>
               <div className={styles.image}>
                  <Image alt="mock" layout="fill" objectFit="cover"
                         quality={100} src={mockImage}/>
                  <svg fill="none" height="226" viewBox="0 0 435 226"
                       width="435" xmlns="http://www.w3.org/2000/svg">
                     <path d="M143.239 186.735C143.254 189.434 143.269 188.025 143.284 190.724V200.117C143.284 212.981 132.854 223.409 119.988 223.409H26.8063C13.941 223.409 3.50977 212.981 3.50977 200.117V106.953C3.50977 94.0892 13.941 83.6611 26.8063 83.6611H119.988C132.854 83.6611 143.284 94.0892 143.284 106.953C143.284 113.804 143.261 131.363 143.261 131.363"
                           stroke="white" strokeMiterlimit="8"
                           strokeWidth="3"/>
                     <path clipRule="evenodd"
                           d="M73.6256 127.275C79.6256 127.275 84.4902 132.115 84.4902 138.086C84.4902 141.071 83.2752 143.773 81.3088 145.73L80.3654 146.362L89.3844 179.795H57.8672L66.8862 146.362L65.9429 145.73C63.9764 143.773 62.7614 141.071 62.7614 138.086C62.7614 132.115 67.6261 127.275 73.6256 127.275Z"
                           fillRule="evenodd"
                           stroke="white" strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M179.059 174.402C179.059 175.822 178.837 177.078 178.395 178.172C177.952 179.266 177.307 180.19 176.461 180.945C175.615 181.688 174.573 182.254 173.336 182.645C172.112 183.035 170.667 183.23 169 183.23H166.891V191.297C166.891 191.427 166.845 191.544 166.754 191.648C166.676 191.753 166.539 191.837 166.344 191.902C166.148 191.967 165.888 192.02 165.562 192.059C165.237 192.098 164.82 192.117 164.312 192.117C163.818 192.117 163.401 192.098 163.062 192.059C162.737 192.02 162.477 191.967 162.281 191.902C162.086 191.837 161.949 191.753 161.871 191.648C161.793 191.544 161.754 191.427 161.754 191.297V168.562C161.754 167.951 161.91 167.495 162.223 167.195C162.548 166.883 162.971 166.727 163.492 166.727H169.449C170.048 166.727 170.615 166.753 171.148 166.805C171.695 166.844 172.346 166.941 173.102 167.098C173.857 167.241 174.618 167.514 175.387 167.918C176.168 168.322 176.832 168.836 177.379 169.461C177.926 170.073 178.342 170.796 178.629 171.629C178.915 172.449 179.059 173.374 179.059 174.402ZM173.688 174.773C173.688 173.888 173.531 173.159 173.219 172.586C172.906 172.013 172.522 171.59 172.066 171.316C171.611 171.043 171.129 170.874 170.621 170.809C170.126 170.73 169.612 170.691 169.078 170.691H166.891V179.266H169.195C170.016 179.266 170.699 179.155 171.246 178.934C171.806 178.712 172.262 178.406 172.613 178.016C172.965 177.612 173.232 177.137 173.414 176.59C173.596 176.03 173.688 175.424 173.688 174.773ZM210.855 191.336C210.855 191.479 210.829 191.603 210.777 191.707C210.725 191.798 210.602 191.876 210.406 191.941C210.211 192.007 209.924 192.052 209.547 192.078C209.169 192.104 208.655 192.117 208.004 192.117C207.457 192.117 207.021 192.104 206.695 192.078C206.37 192.052 206.109 192.007 205.914 191.941C205.732 191.863 205.602 191.772 205.523 191.668C205.445 191.551 205.38 191.414 205.328 191.258L203.062 185.613C202.789 184.975 202.522 184.409 202.262 183.914C202.001 183.419 201.708 183.009 201.383 182.684C201.07 182.345 200.706 182.091 200.289 181.922C199.872 181.753 199.391 181.668 198.844 181.668H197.242V191.297C197.242 191.427 197.197 191.544 197.105 191.648C197.027 191.753 196.891 191.837 196.695 191.902C196.5 191.967 196.24 192.02 195.914 192.059C195.589 192.098 195.172 192.117 194.664 192.117C194.169 192.117 193.753 192.098 193.414 192.059C193.089 192.02 192.828 191.967 192.633 191.902C192.438 191.837 192.301 191.753 192.223 191.648C192.145 191.544 192.105 191.427 192.105 191.297V168.348C192.105 167.775 192.249 167.365 192.535 167.117C192.835 166.857 193.199 166.727 193.629 166.727H200.172C200.836 166.727 201.383 166.74 201.812 166.766C202.242 166.792 202.633 166.824 202.984 166.863C204 167.007 204.911 167.254 205.719 167.605C206.539 167.957 207.229 168.419 207.789 168.992C208.362 169.552 208.798 170.223 209.098 171.004C209.397 171.772 209.547 172.658 209.547 173.66C209.547 174.507 209.436 175.281 209.215 175.984C209.007 176.674 208.694 177.293 208.277 177.84C207.861 178.387 207.346 178.862 206.734 179.266C206.122 179.669 205.426 179.995 204.645 180.242C205.022 180.424 205.374 180.646 205.699 180.906C206.038 181.167 206.35 181.486 206.637 181.863C206.936 182.228 207.216 182.651 207.477 183.133C207.737 183.602 207.991 184.135 208.238 184.734L210.367 189.715C210.562 190.21 210.693 190.574 210.758 190.809C210.823 191.03 210.855 191.206 210.855 191.336ZM204.234 174.188C204.234 173.354 204.046 172.651 203.668 172.078C203.29 171.505 202.672 171.102 201.812 170.867C201.552 170.802 201.253 170.75 200.914 170.711C200.589 170.672 200.133 170.652 199.547 170.652H197.242V177.82H199.859C200.589 177.82 201.227 177.736 201.773 177.566C202.32 177.384 202.776 177.137 203.141 176.824C203.505 176.499 203.779 176.115 203.961 175.672C204.143 175.229 204.234 174.734 204.234 174.188ZM246.441 179.07C246.441 181.167 246.181 183.042 245.66 184.695C245.139 186.349 244.365 187.755 243.336 188.914C242.307 190.06 241.031 190.939 239.508 191.551C237.997 192.15 236.246 192.449 234.254 192.449C232.288 192.449 230.569 192.195 229.098 191.688C227.639 191.167 226.422 190.379 225.445 189.324C224.469 188.27 223.733 186.928 223.238 185.301C222.757 183.673 222.516 181.746 222.516 179.52C222.516 177.475 222.776 175.639 223.297 174.012C223.818 172.371 224.592 170.978 225.621 169.832C226.65 168.686 227.919 167.807 229.43 167.195C230.953 166.583 232.717 166.277 234.723 166.277C236.637 166.277 238.323 166.531 239.781 167.039C241.253 167.547 242.477 168.328 243.453 169.383C244.443 170.438 245.185 171.772 245.68 173.387C246.188 174.988 246.441 176.883 246.441 179.07ZM241.051 179.344C241.051 178.016 240.947 176.811 240.738 175.73C240.53 174.637 240.172 173.706 239.664 172.938C239.169 172.156 238.505 171.557 237.672 171.141C236.839 170.711 235.797 170.496 234.547 170.496C233.284 170.496 232.229 170.737 231.383 171.219C230.536 171.688 229.853 172.319 229.332 173.113C228.811 173.908 228.44 174.839 228.219 175.906C228.01 176.961 227.906 178.081 227.906 179.266C227.906 180.646 228.01 181.889 228.219 182.996C228.427 184.09 228.779 185.027 229.273 185.809C229.768 186.59 230.432 187.189 231.266 187.605C232.099 188.009 233.147 188.211 234.41 188.211C235.673 188.211 236.728 187.977 237.574 187.508C238.421 187.039 239.104 186.401 239.625 185.594C240.146 184.786 240.51 183.849 240.719 182.781C240.94 181.701 241.051 180.555 241.051 179.344ZM276.656 168.836C276.656 169.214 276.637 169.539 276.598 169.812C276.572 170.073 276.526 170.288 276.461 170.457C276.396 170.613 276.311 170.73 276.207 170.809C276.116 170.887 276.012 170.926 275.895 170.926H269.566V191.297C269.566 191.427 269.521 191.544 269.43 191.648C269.352 191.753 269.215 191.837 269.02 191.902C268.824 191.967 268.557 192.02 268.219 192.059C267.893 192.098 267.483 192.117 266.988 192.117C266.493 192.117 266.077 192.098 265.738 192.059C265.413 192.02 265.152 191.967 264.957 191.902C264.762 191.837 264.618 191.753 264.527 191.648C264.449 191.544 264.41 191.427 264.41 191.297V170.926H258.082C257.952 170.926 257.841 170.887 257.75 170.809C257.659 170.73 257.581 170.613 257.516 170.457C257.451 170.288 257.398 170.073 257.359 169.812C257.333 169.539 257.32 169.214 257.32 168.836C257.32 168.445 257.333 168.113 257.359 167.84C257.398 167.566 257.451 167.352 257.516 167.195C257.581 167.026 257.659 166.909 257.75 166.844C257.841 166.766 257.952 166.727 258.082 166.727H275.895C276.012 166.727 276.116 166.766 276.207 166.844C276.311 166.909 276.396 167.026 276.461 167.195C276.526 167.352 276.572 167.566 276.598 167.84C276.637 168.113 276.656 168.445 276.656 168.836ZM303.688 189.988C303.688 190.366 303.668 190.685 303.629 190.945C303.603 191.193 303.557 191.395 303.492 191.551C303.427 191.707 303.342 191.824 303.238 191.902C303.147 191.967 303.043 192 302.926 192H290.23C289.801 192 289.436 191.876 289.137 191.629C288.85 191.368 288.707 190.952 288.707 190.379V168.348C288.707 167.775 288.85 167.365 289.137 167.117C289.436 166.857 289.801 166.727 290.23 166.727H302.848C302.965 166.727 303.069 166.759 303.16 166.824C303.251 166.889 303.329 167.007 303.395 167.176C303.46 167.332 303.505 167.54 303.531 167.801C303.57 168.048 303.59 168.367 303.59 168.758C303.59 169.122 303.57 169.435 303.531 169.695C303.505 169.943 303.46 170.145 303.395 170.301C303.329 170.457 303.251 170.574 303.16 170.652C303.069 170.717 302.965 170.75 302.848 170.75H293.824V176.922H301.461C301.578 176.922 301.682 176.961 301.773 177.039C301.878 177.104 301.962 177.215 302.027 177.371C302.092 177.514 302.138 177.716 302.164 177.977C302.203 178.224 302.223 178.53 302.223 178.895C302.223 179.272 302.203 179.585 302.164 179.832C302.138 180.079 302.092 180.281 302.027 180.438C301.962 180.581 301.878 180.685 301.773 180.75C301.682 180.815 301.578 180.848 301.461 180.848H293.824V187.977H302.926C303.043 187.977 303.147 188.016 303.238 188.094C303.342 188.159 303.427 188.27 303.492 188.426C303.557 188.582 303.603 188.79 303.629 189.051C303.668 189.298 303.688 189.611 303.688 189.988ZM334.781 188.172C334.781 188.497 334.768 188.777 334.742 189.012C334.729 189.233 334.703 189.428 334.664 189.598C334.625 189.754 334.573 189.891 334.508 190.008C334.443 190.125 334.339 190.262 334.195 190.418C334.052 190.561 333.772 190.75 333.355 190.984C332.952 191.219 332.451 191.447 331.852 191.668C331.266 191.876 330.589 192.052 329.82 192.195C329.065 192.339 328.245 192.41 327.359 192.41C325.628 192.41 324.065 192.143 322.672 191.609C321.279 191.076 320.094 190.281 319.117 189.227C318.141 188.159 317.392 186.831 316.871 185.242C316.35 183.654 316.09 181.805 316.09 179.695C316.09 177.547 316.376 175.639 316.949 173.973C317.522 172.306 318.323 170.906 319.352 169.773C320.38 168.641 321.611 167.781 323.043 167.195C324.488 166.609 326.077 166.316 327.809 166.316C328.512 166.316 329.189 166.375 329.84 166.492C330.491 166.609 331.09 166.766 331.637 166.961C332.197 167.143 332.698 167.358 333.141 167.605C333.583 167.853 333.889 168.068 334.059 168.25C334.241 168.419 334.365 168.562 334.43 168.68C334.495 168.797 334.547 168.947 334.586 169.129C334.625 169.311 334.651 169.526 334.664 169.773C334.69 170.021 334.703 170.327 334.703 170.691C334.703 171.082 334.69 171.414 334.664 171.688C334.638 171.961 334.592 172.182 334.527 172.352C334.462 172.521 334.384 172.645 334.293 172.723C334.202 172.801 334.098 172.84 333.98 172.84C333.785 172.84 333.538 172.729 333.238 172.508C332.939 172.273 332.548 172.02 332.066 171.746C331.598 171.46 331.031 171.206 330.367 170.984C329.716 170.75 328.935 170.633 328.023 170.633C327.021 170.633 326.122 170.841 325.328 171.258C324.547 171.661 323.876 172.247 323.316 173.016C322.77 173.771 322.353 174.689 322.066 175.77C321.78 176.85 321.637 178.068 321.637 179.422C321.637 180.906 321.786 182.195 322.086 183.289C322.398 184.37 322.835 185.262 323.395 185.965C323.967 186.668 324.651 187.195 325.445 187.547C326.253 187.885 327.158 188.055 328.16 188.055C329.072 188.055 329.859 187.951 330.523 187.742C331.188 187.521 331.754 187.28 332.223 187.02C332.704 186.759 333.095 186.525 333.395 186.316C333.707 186.108 333.948 186.004 334.117 186.004C334.247 186.004 334.352 186.03 334.43 186.082C334.508 186.134 334.573 186.238 334.625 186.395C334.677 186.551 334.716 186.772 334.742 187.059C334.768 187.332 334.781 187.703 334.781 188.172ZM364.352 168.836C364.352 169.214 364.332 169.539 364.293 169.812C364.267 170.073 364.221 170.288 364.156 170.457C364.091 170.613 364.007 170.73 363.902 170.809C363.811 170.887 363.707 170.926 363.59 170.926H357.262V191.297C357.262 191.427 357.216 191.544 357.125 191.648C357.047 191.753 356.91 191.837 356.715 191.902C356.52 191.967 356.253 192.02 355.914 192.059C355.589 192.098 355.178 192.117 354.684 192.117C354.189 192.117 353.772 192.098 353.434 192.059C353.108 192.02 352.848 191.967 352.652 191.902C352.457 191.837 352.314 191.753 352.223 191.648C352.145 191.544 352.105 191.427 352.105 191.297V170.926H345.777C345.647 170.926 345.536 170.887 345.445 170.809C345.354 170.73 345.276 170.613 345.211 170.457C345.146 170.288 345.094 170.073 345.055 169.812C345.029 169.539 345.016 169.214 345.016 168.836C345.016 168.445 345.029 168.113 345.055 167.84C345.094 167.566 345.146 167.352 345.211 167.195C345.276 167.026 345.354 166.909 345.445 166.844C345.536 166.766 345.647 166.727 345.777 166.727H363.59C363.707 166.727 363.811 166.766 363.902 166.844C364.007 166.909 364.091 167.026 364.156 167.195C364.221 167.352 364.267 167.566 364.293 167.84C364.332 168.113 364.352 168.445 364.352 168.836ZM391.383 189.988C391.383 190.366 391.363 190.685 391.324 190.945C391.298 191.193 391.253 191.395 391.188 191.551C391.122 191.707 391.038 191.824 390.934 191.902C390.842 191.967 390.738 192 390.621 192H377.926C377.496 192 377.132 191.876 376.832 191.629C376.546 191.368 376.402 190.952 376.402 190.379V168.348C376.402 167.775 376.546 167.365 376.832 167.117C377.132 166.857 377.496 166.727 377.926 166.727H390.543C390.66 166.727 390.764 166.759 390.855 166.824C390.947 166.889 391.025 167.007 391.09 167.176C391.155 167.332 391.201 167.54 391.227 167.801C391.266 168.048 391.285 168.367 391.285 168.758C391.285 169.122 391.266 169.435 391.227 169.695C391.201 169.943 391.155 170.145 391.09 170.301C391.025 170.457 390.947 170.574 390.855 170.652C390.764 170.717 390.66 170.75 390.543 170.75H381.52V176.922H389.156C389.273 176.922 389.378 176.961 389.469 177.039C389.573 177.104 389.658 177.215 389.723 177.371C389.788 177.514 389.833 177.716 389.859 177.977C389.898 178.224 389.918 178.53 389.918 178.895C389.918 179.272 389.898 179.585 389.859 179.832C389.833 180.079 389.788 180.281 389.723 180.438C389.658 180.581 389.573 180.685 389.469 180.75C389.378 180.815 389.273 180.848 389.156 180.848H381.52V187.977H390.621C390.738 187.977 390.842 188.016 390.934 188.094C391.038 188.159 391.122 188.27 391.188 188.426C391.253 188.582 391.298 188.79 391.324 189.051C391.363 189.298 391.383 189.611 391.383 189.988ZM425.992 178.992C425.992 181.31 425.686 183.296 425.074 184.949C424.475 186.59 423.609 187.931 422.477 188.973C421.344 190.014 419.964 190.783 418.336 191.277C416.721 191.759 414.794 192 412.555 192H406.52C406.09 192 405.725 191.876 405.426 191.629C405.139 191.368 404.996 190.952 404.996 190.379V168.348C404.996 167.775 405.139 167.365 405.426 167.117C405.725 166.857 406.09 166.727 406.52 166.727H413.004C415.257 166.727 417.164 166.993 418.727 167.527C420.302 168.048 421.624 168.829 422.691 169.871C423.772 170.9 424.592 172.176 425.152 173.699C425.712 175.223 425.992 176.987 425.992 178.992ZM420.68 179.168C420.68 177.97 420.536 176.857 420.25 175.828C419.977 174.799 419.527 173.908 418.902 173.152C418.29 172.397 417.496 171.811 416.52 171.395C415.556 170.965 414.286 170.75 412.711 170.75H410.113V187.938H412.789C414.195 187.938 415.38 187.755 416.344 187.391C417.307 187.026 418.108 186.479 418.746 185.75C419.397 185.008 419.879 184.09 420.191 182.996C420.517 181.902 420.68 180.626 420.68 179.168Z"
                           fill="white"/>
                     <path d="M72.5977 3.2832C97.7614 3.2832 118.161 20.3051 118.161 41.3026" stroke="white"
                           strokeMiterlimit="8"
                           strokeWidth="3"/>
                     <path d="M74.6543 3.2832C49.4902 3.2832 29.091 20.3052 29.091 41.303" stroke="white"
                           strokeMiterlimit="8"
                           strokeWidth="3"/>
                     <path d="M73.7383 16.5273C56.1424 16.5273 41.8783 29.051 41.8783 44.4998" stroke="white"
                           strokeMiterlimit="8"
                           strokeWidth="3"/>
                     <path d="M73.5117 16.5273C91.1076 16.5273 105.372 29.0512 105.372 44.4998" stroke="white"
                           strokeMiterlimit="8"
                           strokeWidth="3"/>
                     <path d="M29.0898 40.96V81.43" stroke="white" strokeMiterlimit="8"
                           strokeWidth="3"/>
                     <path d="M118.162 40.96V81.43" stroke="white" strokeMiterlimit="8"
                           strokeWidth="3"/>
                     <path d="M41.8809 44.1572V81.4991" stroke="white" strokeMiterlimit="8"
                           strokeWidth="3"/>
                     <path d="M105.371 44.157V81.4988" stroke="white" strokeMiterlimit="8"
                           strokeWidth="3"/>
                     <path clipRule="evenodd"
                           d="M109.025 129.216C109.025 123.478 113.678 118.826 119.417 118.826C125.156 118.826 129.809 123.478 129.809 129.216C129.809 134.954 125.156 139.606 119.417 139.606C113.678 139.606 109.025 134.954 109.025 129.216Z"
                           fillRule="evenodd"
                           stroke="white" strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M211.799 139.606L224.802 139.607" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M126.84 136.638L130.365 139.663" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M181.424 133.669L192.029 133.669" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M211.799 118.826V139.491" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M270.496 129.33L280.732 129.33" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M270.496 139.606L283.499 139.607" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M270.496 118.826L283.499 118.826" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M270.496 118.826V139.491" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M239.662 118.826V139.491" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M242.861 129.33L253.546 139.662" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M242.404 129.475L253.542 119.512" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M307.951 132.527L307.951 139.642" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M308.18 132.46L315.645 119.511" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M307.423 132.003L299.957 119.055" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M186.449 119.511L196.367 139.484" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M186.09 119.512L176.172 139.485" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M160.184 118.826L160.293 130.985" stroke="white" strokeLinecap="round"
                           strokeMiterlimit="8" strokeWidth="3"/>
                     <path d="M160.413 130.929C160.413 135.595 156.527 139.378 151.734 139.378" stroke="white"
                           strokeMiterlimit="8"
                           strokeWidth="3"/>
                     <path d="M143.283 130.929C143.283 135.595 147.118 139.378 151.848 139.378" stroke="white"
                           strokeMiterlimit="8"
                           strokeWidth="3"/>
                  </svg>
               </div>
               <div className={styles.content}>
                  <div className={styles.left}>
                     <div className={styles.wrapperLeft}>
                        <div className={styles.leftItem}>
                           <div className={styles.imageWrapper}>
                              <Image alt="avatar" layout="fill" src={avatar}/>
                           </div>
                           <Text bold>Hans Winkler</Text>
                           <Text grey>Co-founder</Text>
                           <a href="https://linkedin.com" rel="noreferrer" target="_blank">
                              <IconLinkedin/>
                           </a>
                        </div>
                        <div className={styles.leftItem}>
                           <div className={styles.imageWrapper}>
                              <Image alt="avatar" layout="fill" src={avatar}/>
                           </div>
                           <Text bold>Philip Whetstone</Text>
                           <Text grey>Co-founder</Text>
                           <a href="https://linkedin.com" rel="noreferrer" target="_blank">
                              <IconLinkedin/>
                           </a>
                        </div>
                     </div>
                  </div>
                  <div className={styles.right}>
                     <Text semiBold>After meeting whilst studying for their MBA, Hans and Phil are on a mission to make it
                        easier for people to prove their qualifications are genuine.</Text>
                     <Text semiBold>We want to create a standard in education where individuals have full autonomy of their
                        data and their privacy guaranteed.</Text>
                     <Button blue thin onClick={() => setShowMore(true)}>
                        <div className={styles.buttonRow}>
                           <IconShowDropdown/>
                           <Text white>Read More</Text>
                        </div>
                     </Button>
                  </div>
               </div>
            </div>
            : <div className={styles.page}>
               <div className={styles.imageWrapper1}>
                  <Image alt="Qualkey" src={qkLogo}/>
               </div>
               <div className={styles.center}>
                  <div className={styles.imageWrapperSmall}>
                     <Image alt="avatar" layout="fill" src={avatar}/>
                  </div>
                  <div className={styles.imageWrapperSmall}>
                     <Image alt="avatar" layout="fill" src={avatar}/>
                  </div>
               </div>
               <Text bold large>Our Story</Text>
               <div className={styles.story}>
                  <Text medium semiBold> QualKey was founded by Hans and Phil, two friends who met whilst studying.
                     They discovered that when applying for jobs or continuance of study,
                     employers and educational institutions wanted candidates to prove their
                     qualification was genuine, often needing to see the original certificate as
                     emailed PDFs could be easily forged.
                  </Text>
                  <Text medium semiBold>Hans and Phil found the process of verifying a qualification was stressful, time consuming and
                     inefficient for all parties involved. Sometimes people had to wait weeks and months for their
                     certificates. Verifying authenticity involved manual workflows, multiple emails, calls and
                     unanswered messages. Surely in the 21 st century, there must be an easier way to prove a
                     qualification is authentic. </Text>
                  <Text medium semiBold>The result, QualKey was born.
                     QualKey improves the speed, ease, and security in how qualifications are authenticated with employers,
                     educational institutions and other third parties. QualKey provides digital credentials for your qualification
                     that be shared instantly. We create a standard in education where individuals have full autonomy
                     of their data and their privacy guaranteed. It’s your qualification, so you should be in control of
                     what information you share, with whom, and how often.
                     Hans and Phil are on a mission. In addition to making the process of qualification authentication painless
                     and efficient, we aim to eliminate all fake qualifications in the world by 2030. If you see a qualification
                     that carries the QualKey stamp of approval, you can trust its authenticity.</Text>
               </div>
               <Button blue thin onClick={() => setShowMore(false)}>
                  <div className={styles.buttonRow}>
                     <IconShowDropdown/>
                     <Text white>Go Back</Text>
                  </div>
               </Button>
            </div>}
      </div>
   )
}

export default AboutView