
export type FilterType = 'title' | 'authors' | 'tags' | 'date' | 'status' | 'citations';

export function Filter(searchTerm: string, filterType: FilterType, data: unknown[]) {
  // Filter function that checks if a string contains the search term
  const FilterText = (text: string, searchTerm: string) => {
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Filter function that checks if any string in an array matches the search term
  const FilterArrayText = (textArr: string[], searchTerm: string) => {
    for (let index = 0; index < textArr.length; index++) {
      if (FilterText(textArr[index], searchTerm)) return true;
    }
    return false;
  };

  // Filter function that checks if the date matches the search term
  const FilterDate = (date: Date, searchTerm: string) => {
    const dateString = date.toISOString().split("T")[0]; // Get the date in YYYY-MM-DD format
    return dateString.includes(searchTerm);
  };

  // Functions for filtering based on different types of data
  const filterFunctions = {
    title: (value: unknown, searchTerm: string) => {
      if (typeof value === "string") {
        return FilterText(value, searchTerm);
      }
      return false;
    },
    authors: (value: unknown, searchTerm: string) => {
      if (typeof value === "string") {
        return FilterArrayText(value.split(", "), searchTerm);
      }
      return false;
    },
    tags: (value: unknown, searchTerm: string) => {
      if (typeof value === "string") {
        return FilterArrayText(value.split(", "), searchTerm);
      }
      return false;
    },
    date: (value: unknown, searchTerm: string) => {
      if (value instanceof Date) {
        return FilterDate(value, searchTerm);
      }
      return false;
    },
    status: (value: unknown, searchTerm: string) => {
      if (typeof value === "string") {
        return FilterText(value, searchTerm);
      }
      return false;
    },
    citations: (value: unknown, searchTerm: string) => {
      if (typeof value === "number") {
        return value.toString().includes(searchTerm);
      }
      return false;
    },
  };

  const filterFunction = filterFunctions[filterType];

  if (filterFunction) {
    return (data as any[]).filter((e) => {


      // Check if filtering will be applied to proposals
      if ("research" in e) {
        return filterFunction(e.research[filterType], searchTerm);
      }

      return filterFunction(e[filterType], searchTerm);
    }
    );
  }

  return [];
}