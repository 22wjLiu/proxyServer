package dashboard

import "net/http"

func Serve(addr string, fs http.FileSystem) error {
	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(fs))
	return http.ListenAndServe(addr, mux)
}