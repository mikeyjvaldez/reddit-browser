import { useContext, useEffect } from "react";
import { useImmer } from "use-immer";
import { FilterContext } from "../providers/FilterContext";

export default function useListing() {
  const filterContext = useContext(FilterContext);
  const [data, setData] = useImmer({
    listings: [],
    errorMessage: "",
    isRefresh: false,
  });
  const refresh = () => {
    setData((draft) => {
      draft.isRefresh = true;
    });
  };
  /**
   * Fetch's subreddit posts on initial load and when listType changes from the filter context
   */
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.reddit.com/r/pics/${filterContext.filterData.listType}.json`
        );
        const responseData = await response.json();
        setData((draft) => {
          if (responseData && responseData.data && responseData.data.children) {
            draft.listings = responseData.data.children;
          }
          draft.errorMessage = "";
        });
      } catch (e) {
        setData((draft) => {
          draft.errorMessage = "Failed to fetch posts. Swipe down to refresh.";
        });
      }
    }
    void fetchData();
  }, [filterContext.filterData.listType]);
  /**
   * Fetch's subreddit posts when isRefresh is true
   */
  useEffect(() => {
    async function refreshData() {
      try {
        const response = await fetch(
          `https://api.reddit.com/r/pics/${filterContext.filterData.listType}.json`
        );
        const responseData = await response.json();
        setData((draft) => {
          if (responseData && responseData.data && responseData.data.children) {
            draft.listings = responseData.data.children;
          }
          draft.errorMessage = "";
          draft.isRefresh = false;
        });
      } catch (e) {
        setData((draft) => {
          draft.errorMessage = "Failed to fetch posts. Swipe down to refresh.";
          draft.isRefresh = false;
        });
      }
    }
    if (data.isRefresh) {
      void refreshData();
    }
  }, [data.isRefresh]);
  return {
    ...data,
    refresh,
  };
}
