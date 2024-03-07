import { useState, useEffect } from "react";
import axios from "axios";
import { generateQueryString } from "@/src/utils/url";

const useFetch = (props) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState(props.url);

    const updateUrl = (url) => setUrl(url);

    const getData = async() => {
        setError(null);
        setLoading(true);
        setData(null);
        
        const result = { data: null, error: null, loading: true };
        try{
            const res = await axios.get(url);
            const resData = await res.data;
            result.data = resData;
            setData(resData);
        } catch(err) {
            result.error = err.response.data;
            setError(err.response.data);
        } finally {
            result.loading = false;
            setLoading(false);
        }
        return result;
    }

    const postData = async (payload) => {
        setError(null);
        setLoading(true);
        setData(null);

        const result = { data: null, error: null, loading: true };
        try{
            const res = await axios.post(url, payload);
            const resData = await res.data;
            result.data = resData;
            setData(resData);
        } catch (err){
            result.error = err.response.data;
            setError(err.response.data);
        } finally {
            result.loading = false;
            setLoading(false);
        }
        return result;
    }

    const putData = async (payload) => {
        setError(null);
        setLoading(true);
        setData(null);

        const result = { data: null, error: null, loading: true };
        try{
            const res = await axios.put(url, payload);
            const resData = await res.data;
            result.data = resData;
            setData(resData);
        } catch (err) {
            result.error = err.response.data;
            setError(err.response.data);
        } finally {
            result.loading = false;
            setLoading(false);
        }
        return result;
    }

    const deleteData = async (payload) => {
        setError(null);
        setLoading(true);
        setData(null);

        const result = { data: null, error: null, loading: true };
        try{
            // const res = await axios.delete(`${url}/?${generateQueryString(payload)}`);
            const res = await axios.delete(url, {data: payload});
            const resData = await res.data;
            result.data = resData;
            setData(resData);
        } catch (err){
            result.error = err.response.data;
            setError(err.response.data);
        } finally {
            setLoading(false);
            result.loading = false;
        }
        return result;
    }

    const dispatch = async (payload = null) => {
        return new Promise((resolve, reject) => {
            if (props.method === "GET") {
                return resolve(getData());
              } else if (props.method === "POST") {
                return resolve(postData(payload));
              } else if (props.method === "PUT") {
                return resolve(putData(payload));
              } else if (props.method === "DELETE") {
                return resolve(deleteData(payload));
              }
            return reject ({
                data, error, loading,
            });
        })
    }

    useEffect(() => {
        if(props.method === 'GET' && props.get_autoFetch) getData();
    }, [])

    return { data, setData, error, loading, dispatch, updateUrl };
}

export default useFetch; 

useFetch.defaultProps = {
    get_autoFetch: true,
    method: 'GET',
    url: '/api/hello',
}