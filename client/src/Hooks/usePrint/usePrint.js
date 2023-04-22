import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const usePrint = ({
  documentTitle,
  ComponentToPrint,
  componentProps,
  onAfterPrint = () => {},
}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle,
    onAfterPrint,
  });

  const PrintComponent = () => {
    return (
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} {...componentProps} />
      </div>
    );
  };

  return [PrintComponent, handlePrint];
};
