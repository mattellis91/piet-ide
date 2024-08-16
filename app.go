package main

import (
	"bytes"
	"context"
	"fmt"
	"image"
	"log"
	"os"

	"image/png"

	"github.com/vincent-petithory/dataurl"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
	CurrentFile
}

type CurrentFile struct {
	Width  int
	Height int
	Name   string
	Path   string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) WriteImage(dataUrl string) bool {
	dataURL, err := dataurl.DecodeString(dataUrl)
	if err != nil {
		fmt.Println(err)
		return false
	}
	fmt.Printf("content type: %s, data: %s\n", dataURL.MediaType.ContentType(), string(dataURL.Data))
	if dataURL.ContentType() == "image/png" {
		path, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{})
		if err != nil {
			return false
		}
		fmt.Print(path)
		saveFile, err := os.Create(path)
		if err != nil {
			return false
		}
		saveFile.Write(dataURL.Data)
		return true
	} else {
		return false
	}
}

func (a *App) OpenImage() string {
	path, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		return ""
	}

	f, err := os.Open(path)

	if err != nil {
		return ""
	}

	im, _, err := image.Decode(f)

	if err != nil {
		return ""
	}

	buf := new(bytes.Buffer)
	png.Encode(buf, im)
	return dataurl.EncodeBytes(buf.Bytes())
}

func (a *App) OpenImageFromDefaultFolder() {

}

func (a *App) SetCurrentFile(width, height int) {
	a.CurrentFile = CurrentFile{Width: width, Height: height, Name: "", Path: ""}
}

func (a *App) GetCurrentFile() CurrentFile {
	return a.CurrentFile
}

func (a *App) GetRecent() string {
	return getFileContentsAsString("./recent.json")
}

func (a *App) GetHelp() string {
	return getFileContentsAsString("./help.md")
}

func getFileContentsAsString(path string) string {
	f, err := os.ReadFile(path)
	if err != nil {
		log.Fatal(err)
	}
	return string(f)
}
