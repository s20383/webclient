import { useState, useEffect } from "react";

export interface GeneratorParams<T> {
  selector: string,
  result: ((el: T, index: number) => JSX.Element) | ((el: T) => JSX.Element),
  update?: any
}

const ContentsGenerator = <T extends Element>(props: Readonly<GeneratorParams<T>>) => {
  const [contents, setContents] = useState<T[]>([]);
  useEffect(() => setContents(Array.from(document.querySelectorAll(props.selector))), [props.update, props.selector]);
  return <>{contents.map(props.result)}</>;
};

export default ContentsGenerator;
