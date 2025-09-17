package common


import (
	"io"
	"net"
	"sync"
)


func Pipe(a, b net.Conn) {
	var wg sync.WaitGroup; wg.Add(2)
	go func(){ defer wg.Done(); _, _ = io.Copy(a, b); if tc, ok := a.(*net.TCPConn); ok { _ = tc.CloseWrite() } else { _ = a.Close() } }()
	go func(){ defer wg.Done(); _, _ = io.Copy(b, a); if tc, ok := b.(*net.TCPConn); ok { _ = tc.CloseWrite() } else { _ = b.Close() } }()
	wg.Wait(); _ = a.Close(); _ = b.Close()
}