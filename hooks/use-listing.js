import { useContext, useEffect } from "react";
import { useImmer } from "use-immer";
import { FilterContext } from "../providers/FilterContext";

export default function useListing() {
  const filterContext = useContext(FilterContext);
  const [data, setData] = useImmer({
    listings: [],
    errorMessage: "",
    isRefresh: false,
    nextToken: null,
    isFetchingNextPage: false,
  });
  const refresh = () => {
    setData((draft) => {
      draft.isRefresh = true;
    });
  };

  const pageNextResults = async () => {
    if (data.nextToken && !data.isFetchingNextPage) {
      setData((draft) => {
        draft.isFetchingNextPage = true;
      });
      try {
        const response = await fetch(
          `https://api.reddit.com/r/pics/${filterContext.filterData.listType}.json?after=${data.nextToken}`
        );
        const responseData = await response.json();
        setData((draft) => {
          if (responseData && responseData.data && responseData.data.children) {
            draft.listings = [...draft.listings, ...responseData.data.children];
          }
          if (responseData && responseData.data && responseData.data.after) {
            draft.nextToken = responseData.data.after;
          } else {
            draft.nextToken = null;
          }
          draft.errorMessage = "";
          draft.isFetchingNextPage = false;
        });
      } catch (e) {
        setData((draft) => {
          draft.errorMessage = "Failed to fetch posts. Swipe down to refresh.";
          draft.isFetchingNextPage = false;
        });
      }
    }
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
          if (responseData && responseData.data && responseData.data.after) {
            draft.nextToken = responseData.data.after;
          } else {
            draft.nextToken = null;
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
          if (responseData && responseData.data && responseData.data.after) {
            draft.nextToken = responseData.data.after;
          } else {
            draft.nextToken = null;
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
    pageNextResults,
  };
}
