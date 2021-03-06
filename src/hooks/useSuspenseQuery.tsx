import { useContext } from 'react';
import ApolloClientContext from '../context/Context';
import {Options} from "../types/types";
import {decorateWithPromise} from "../decorators/decorateWithPromise";
import {manageValueInStore} from "../promise-manager/manage-value-in-store";
import {decorateWithId} from "../decorators/decorateWithId";
import {throwPromise} from "../promise-manager/throw-promise";

const compose = require("ramda/src/compose");

export function useSuspenseQuery(query: any, options?: Options) {
  const apolloClient = useContext(ApolloClientContext);

  const [id, promise, result] = compose(
    decorateWithPromise,
    manageValueInStore,
    decorateWithId
  )(
    apolloClient,
    query,
    options
  );

  if (result) {
    return result;
  } else {
    return throwPromise(promise, id);
  }
}