import Icon from "@ant-design/icons";

const StackOverflowSvg = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 16V11H16V18H2V11H4V16H14Z" fill="#BCBBBB" />
      <path
        d="M12.09 0.722916L10.8775 1.62476L15.3867 7.68684L16.5992 6.78499L12.09 0.722916Z"
        fill="#F48024"
      />
      <path d="M5 15H13V13H5V15Z" fill="#F48024" />
      <path
        d="M14.1477 9.13223L8.34235 4.29697L9.3093 3.13579L15.1152 7.97105L14.1477 9.13223Z"
        fill="#F48024"
      />
      <path
        d="M6.44709 7.6572L13.2962 10.847L13.9339 9.47678L7.08484 6.28749L6.44709 7.6572Z"
        fill="#F48024"
      />
      <path
        d="M12.9806 12.6551L5.40145 11.3905L5.7797 9.71865L13.1968 11.1981L12.9806 12.6551Z"
        fill="#F48024"
      />
    </svg>
  );
};

const StackOverflow = ({ ...props }) => (
  <Icon component={StackOverflowSvg} {...props} />
);

export { StackOverflow };