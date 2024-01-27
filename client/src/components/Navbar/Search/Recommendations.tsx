import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoBriefcase } from "react-icons/go";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

type result = {
  _id: string;
  title: string;
  type: string;
  image?: string;
  description: string;
};

const SkeletonResults = () => {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

const Recommendations = ({
  search,
  setSearch,
  setFocus,
}: {
  search: string;
  setSearch: any;
  setFocus: any;
}) => {
  const [results, setResults] = useState<result[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      handleGetSearchResults();
    }
  }, [search]);

  const handleGetSearchResults = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URI}/search`, {
        search,
      });
      const data = res.data;
      setResults(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const boldString = (str: string) => {
    const regex = new RegExp(search, "gi");
    const bolded = str.replace(regex, (match) => `<b>${match}</b>`);
    return <div dangerouslySetInnerHTML={{ __html: bolded }} />;
  };

  const getLink = (result: result) => {
    result.type = result.type.toLowerCase();
    if (result.type === "job") {
      return `/job/${result._id}`;
    } else if (result.type === "company") {
      return `/company/${result._id}`;
    } else if (result.type.toLowerCase() === "person") {
      return `/user/${result._id}`;
    }
    return "/";
  };

  return (
    <div className="absolute top-12 left-0 w-full bg-white shadow-md rounded-md p-4">
      {loading && <SkeletonResults />}
      {!results.length && !loading && (
        <p className="text-gray-500 text-sm">No results found...</p>
      )}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[300px]">
        {!loading &&
          results.map((result: result) => (
            <div
              onClick={(e) => {
                e.preventDefault();
                setSearch("");
                setFocus(false);
                navigate(getLink(result));
              }}
              key={result._id}
              className="flex items-center cursor-pointer gap-4 hover:bg-gray-100 p-1 rounded"
            >
              <div className="w-12 h-12 rounded-md bg-gray-300 flex items-center justify-center">
                {result.image ? (
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <GoBriefcase className=" text-gray-500" size={30} />
                )}
              </div>
              <div>
                <p className="text-sm font-">{boldString(result.title)}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <p className="text-xs text-gray-500">{result.type}</p>
                  <span>•</span>
                  <p>
                    {result.description.length > 0
                      ? `${result.description.slice(0, 30)}...`
                      : result.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Recommendations;
