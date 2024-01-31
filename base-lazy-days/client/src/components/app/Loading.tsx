import { Spinner, Text } from "@chakra-ui/react";
import { useIsFetching} from "@tanstack/react-query";

export function Loading() {
  // NOTE: useIsFetching returns the number of queries that are currently
  //  fetching, it's not a boolean. If it returns 0, then there aren't any
  //  queries fetching.
  const isFetching = useIsFetching();
  const display = isFetching ? "inherit" : "none";

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="olive.200"
      color="olive.800"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}
