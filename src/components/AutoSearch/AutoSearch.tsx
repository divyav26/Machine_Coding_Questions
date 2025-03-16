import { useEffect, useState } from "react";

const AutoSearch = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [cash, setCash] = useState<{ [key: string]: any }>({});

  const fetchData = async () => {
    // it come from cashing if the input is already searched
    if (cash[input]) {
      setCash(cash[input]);
      return;
    }

    console.log("fetching data");
    let data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    let res = await data?.json();
    console.log(res?.recipes);
    console.log("after fetching data");
    setResult(res.recipes);
    setCash({ ...cash, [input]: res.recipes });
  };

  //optimization to avoid multiple api calls
  useEffect(() => {
    let timer = setTimeout(() => {
      fetchData(), 500;
    });
    return () => {
      clearTimeout(timer);
    };
  }, [input]);
  return (
    <>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResult(true)}
          onBlur={() => setShowResult(false)}
        />
      </div>
      <div className="container">
        {showResult &&
          result.map((item: any) => {
            return (
              <div key={item.id} className="result">
                {item.name}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AutoSearch;
