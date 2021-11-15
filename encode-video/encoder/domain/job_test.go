package domain_test

import (
	"encoder/domain"
	"github.com/stretchr/testify/require"
	uuid "github.com/satori/go.uuid"
	"testing"
	"time"
)

func TestNewJob(t *testing.T) {
	video := domain.NewVideo()
	video.ID = uuid.NewV4().String()
	video.ResourceID = "a"
	video.FilePath = "path"
	video.CreatAt = time.Now()

	job, err := domain.NewJob("output", "status",  video)

	require.NotNil(t, job)
	require.Nil(t, err)
}
