package logging


import (
	"log"

	"github.com/22wjLiu/proxyServer/internal/config"
)


type Logger struct{ level config.LogModeEnum }


func New(c config.Logging) *Logger {
	return &Logger{level: c.Level}
}

func (l *Logger) Debugf(f string, v ...any) {
	if l.level == "debug" {
		log.Printf("[DEBUG] "+f, v...)
	}
}

func (l *Logger) Infof(f string, v ...any) {
	log.Printf("[INFO] "+f, v...)
}

func (l *Logger) Errorf(f string, v ...any) {
	log.Printf("[ERROR] "+f, v...)
}

func (l *Logger) Info(v ...any) {
	log.Println(append([]any{"[INFO]"}, v...)...)
}