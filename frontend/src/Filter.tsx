export type FilterType = 'title' | 'authors' | 'tags' | 'date' | 'status' | 'citations';

export function Filter(searchTerm: string, filterType: FilterType, data: unknown[]) {
  // Filter function that checks if a string contains the search term
  const FilterText = (text: string, searchTerm: string) => {
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Filter function that checks if any string in an array matches the search term
  const FilterArrayText = (textArr: unknown[], searchTerm: string) => {
    for (let index = 0; index < textArr.length; index++) {
      if (FilterText(textArr[index] as string, searchTerm)) return true;
    }

    return false;
  };

  // Filter function that checks if the date matches the search term
  const FilterDate = (date: string, searchTerm: string) => {
    const dateString = date.split("T")[0];
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
      if (Array.isArray(value)) {
        return FilterArrayText(value, searchTerm);
      }
      return false;
    },
    tags: (value: unknown, searchTerm: string) => {
      if (Array.isArray(value)) {
        return FilterArrayText(value, searchTerm);
      }
      return false;
    },
    date: (value: unknown, searchTerm: string) => {
      if (typeof value == "string") {
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

  if (filterFunction && searchTerm.length > 0) {
    return (data as any[]).filter((e) => {
      // Check if filtering will be applied to proposals
      if ("research" in e) {
        return filterFunction(e.research[filterType], searchTerm);
      }

      return filterFunction(e[filterType], searchTerm);
    });
  }

  return data;
}